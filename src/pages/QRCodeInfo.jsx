import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search, CheckCircle2, XCircle, Clock, Percent, Key, BarChart3, QrCode, Scan, Users, Calendar, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { API_CONFIG } from "@/utils/constants.js";

const QRCodeInfo = () => {
  const [code, setCode] = useState("");
  const [qrInfo, setQrInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalQRCodes: 0,
    totalScans: 0,
    activatedQRCodes: 0,
    mostScannedCode: null,
    recentScans: []
  });
  const [isRecentScansExpanded, setIsRecentScansExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllQRCodes = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QR_VERIFY}/all`);
        if (response.data.status === 'success') {
          calculateStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching all QR codes:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные о QR-кодах",
          variant: "destructive",
        });
      }
    };

    fetchAllQRCodes();
  }, [toast]);

  const calculateStats = (records) => {
    if (!records || !Array.isArray(records)) return;

    const totalQRCodes = records.length;
    const totalScans = records.reduce((sum, record) => sum + (record.scanCount || 0), 0);
    const activatedQRCodes = records.filter(record => record.active).length;
    
    const mostScannedCode = records.reduce((max, current) => 
      (current.scanCount > (max?.scanCount || 0)) ? current : max, null);

    const recentScans = records
      .filter(record => record.visited)
      .sort((a, b) => new Date(b.visited) - new Date(a.visited)); // Show all recent scans

    setStats({
      totalQRCodes,
      totalScans,
      activatedQRCodes,
      mostScannedCode,
      recentScans
    });
  };

  const handleSearch = async () => {
    if (!code) {
      toast({
        title: "Ошибка",
        description: "Введите код для поиска",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QR_VERIFY}/${code}`);
      setQrInfo(response.data.data);
      calculateStats(response.data.allRecords);
    } catch (error) {
      console.error('Error fetching QR info:', error);
      toast({
        title: "Ошибка",
        description: error.response?.data?.message || "Не удалось получить информацию о QR-коде",
        variant: "destructive",
      });
      setQrInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!code) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/qr/activate/${code}`);
      setQrInfo(response.data.data);
      toast({
        title: "Успех",
        description: "QR-код успешно активирован",
        variant: "default",
      });
    } catch (error) {
      console.error('Error activating QR code:', error);
      toast({
        title: "Ошибка",
        description: error.response?.data?.message || "Не удалось активировать QR-код",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-2">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Управление QR-кодами</h1>
          <p className="text-muted-foreground">
            Проверьте информацию о QR-коде и управляйте его статусом
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BarChart3 className="h-5 w-5" />
                Общая статистика QR-кодов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <QrCode className="h-4 w-4" />
                    <span className="text-sm">Всего QR-кодов:</span>
                  </div>
                  <p className="text-lg font-semibold">{stats.totalQRCodes}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Scan className="h-4 w-4" />
                    <span className="text-sm">Всего сканирований:</span>
                  </div>
                  <p className="text-lg font-semibold">{stats.totalScans}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Активировано:</span>
                  </div>
                  <p className="text-lg font-semibold">{stats.activatedQRCodes}</p>
                </div>
              </div>

              {stats.mostScannedCode && (
                <div className="mt-6 p-4 bg-card rounded-lg border border-border/50">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Самый популярный QR-код
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Код:</p>
                      <p className="font-medium">{stats.mostScannedCode.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Количество сканирований:</p>
                      <p className="font-medium">{stats.mostScannedCode.scanCount}</p>
                    </div>
                  </div>
                </div>
              )}

              {stats.recentScans.length > 0 && (
                <div className="mt-4">
                  <button 
                    onClick={() => setIsRecentScansExpanded(!isRecentScansExpanded)}
                    className="w-full flex justify-between items-center text-sm font-medium text-muted-foreground p-3 rounded-md bg-secondary/70 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Последние сканирования ({stats.recentScans.length})
                    </div>
                    {isRecentScansExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <AnimatePresence>
                    {isRecentScansExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="max-h-[230px] overflow-y-auto space-y-2 pr-2">
                          {stats.recentScans.map((scan, index) => (
                            <div key={index} className="flex justify-between items-center text-sm p-2 bg-card rounded-md border border-border/30">
                              <span className="font-medium">{scan.code}</span>
                              <span className="text-muted-foreground">
                                {new Date(scan.visited).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Поиск QR-кода</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Введите UUID QR-кода"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="min-w-[120px]"
              >
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Button>
            </div>
          </CardContent>
        </Card>

        {qrInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Информация о QR-коде
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>Скидка:</span>
                    </div>
                    <p className="text-lg font-semibold">{qrInfo.discount}%</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Первое посещение:</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {qrInfo.visited ? new Date(qrInfo.visited).toLocaleString() : 'Нет данных'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Статус:</span>
                  {qrInfo.active ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Активирован
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Не активирован
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Количество сканирований:</span>
                  <span className="font-semibold">{qrInfo.scanCount}</span>
                </div>

                {!qrInfo.active && (
                  <Button
                    onClick={handleActivate}
                    disabled={loading}
                    className="w-full mt-4"
                  >
                    Активировать QR-код
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QRCodeInfo;