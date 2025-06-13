import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from 'react-confetti';
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedCars from "@/components/FeaturedCars";
import Testimonials from "@/components/Testimonials";
import DagestanAttractions from "@/components/DagestanAttractions";
import DressCodeInfo from "@/components/DressCodeInfo";
import AdditionalServicesSection from "@/components/AdditionalServicesSection";
import { useLocation } from "react-router-dom";
import { API_CONFIG } from "@/utils/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Gift, CheckCircle2, XCircle, ShoppingCart, Car } from "lucide-react";

const QR_CODE_STORAGE_KEY = 'bazcar_qr_code';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      verifyQRCode(code);
    }
  }, [searchParams]);

  const verifyQRCode = async (code) => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QR_VERIFY}/${code}`);
      setVerificationStatus(response.data);
      setIsVerificationModalOpen(true);
      if (response.data.status === 'success') {
        setShowConfetti(true);
        
        localStorage.setItem(QR_CODE_STORAGE_KEY, JSON.stringify({
          code: response.data.data.code,
          discount: response.data.data.discount,
          active: response.data.data.active,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      setVerificationStatus({ status: 'error', message: 'Ошибка при проверке кода' });
      setIsVerificationModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsVerificationModalOpen(false);
    setShowConfetti(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/30 text-foreground">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <Dialog open={isVerificationModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {verificationStatus?.status === 'success' ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  {verificationStatus?.data?.active ? 'QR код уже активирован' : 'Успешная проверка'}
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  Ошибка проверки
                </>
              )}
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <p className="text-base">
                {verificationStatus?.message || 'Произошла ошибка при проверке кода'}
              </p>
              {verificationStatus?.status === 'success' && !verificationStatus?.data?.active && (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                      <Gift className="h-5 w-5" />
                      <span className="font-semibold">Ваша скидка: {verificationStatus?.data?.discount}%</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Скидка будет автоматически учтена при оформлении заказа через WhatsApp
                    </p>
                  </div>
                  
                  {verificationStatus?.data?.discount === 100 && (
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                        <Car className="h-5 w-5" />
                        <span className="font-semibold">Поздравляем! Вы выиграли автомобиль!</span>
                      </div>
                      <div className="space-y-3">
                        <div className="relative w-full h-56 rounded-lg overflow-hidden">
                          <img 
                            src="/li6-white/13G08602.webp" 
                            alt="Li L6 в цвете Слоновая кость"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Ваш выигрыш: Li L6 в цвете "Слоновая кость"
                        </p>
                        <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                          <p>• Роскошный электрический седан с премиальным комфортом</p>
                          <p>• Запас хода: 710 км</p>
                          <p>• Мощность: 500 л.с.</p>
                          <p>• Разгон до 100 км/ч: 4.5 секунды</p>
                        </div>
                        <div className="pt-2">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => navigate('/cars/1')}
                          >
                            Посмотреть автомобиль
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {verificationStatus?.status === 'already_used' && !verificationStatus?.data?.active && (
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                    <XCircle className="h-5 w-5" />
                    <span className="font-semibold">Этот QR код уже был активирован ранее</span>
                  </div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                    Каждый QR код может быть использован только один раз
                  </p>
                </div>
              )}
              <Button 
                className="w-full mt-4"
                onClick={handleModalClose}
              >
                Понятно
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        <Hero />
      </motion.section>

      <motion.section
        id="features"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <Features />
      </motion.section>

      <motion.section
        id="featured-cars"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <FeaturedCars />
      </motion.section>

      <motion.section
        id="additional-services"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <AdditionalServicesSection />
      </motion.section>

      <motion.section
        id="dagestan-attractions"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <DagestanAttractions />
      </motion.section>

      <motion.section
        id="dress-code"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-background"
      >
        <DressCodeInfo />
      </motion.section>

      <motion.section
        id="testimonials"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <Testimonials />
      </motion.section>
    </div>
  );
};

export default HomePage;
