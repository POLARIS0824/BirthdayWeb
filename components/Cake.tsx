import React from 'react';
import { motion } from 'framer-motion';

interface CakeProps {
  onClose: () => void;
}

const Cake: React.FC<CakeProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Cake Container */}
        <div className="cake-container relative w-64 h-64 md:w-80 md:h-80">
            <style>{`
                .cake-body {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                    perspective: 1000px;
                }
                .layer {
                    position: relative;
                    background: #fbcfe8; /* pink-200 */
                    border-radius: 10px;
                    box-shadow: 
                        0 2px 0px #f472b6, /* pink-400 */
                        0 4px 0px #f472b6,
                        0 6px 0px #f472b6,
                        0 8px 0px #f472b6,
                        0 10px 0px #f472b6,
                        0 12px 0px #f472b6,
                        0 14px 0px #f472b6,
                        0 16px 0px #f472b6,
                        0 18px 0px #f472b6,
                        0 20px 0px #f472b6,
                        0 22px 0px #f472b6,
                        0 24px 0px #f472b6,
                        0 26px 0px #f472b6,
                        0 28px 0px #f472b6,
                        0 30px 0px #f472b6;
                }
                .layer-bottom {
                    width: 240px;
                    height: 80px;
                    z-index: 1;
                }
                .layer-middle {
                    width: 180px;
                    height: 70px;
                    z-index: 2;
                    margin-bottom: -20px;
                }
                .layer-top {
                    width: 120px;
                    height: 60px;
                    z-index: 3;
                    margin-bottom: -15px;
                }
                .icing {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background: #fdf2f8; /* pink-50 */
                    border-radius: 10px 10px 0 0;
                }
                .drip {
                    position: absolute;
                    top: 10px;
                    width: 20px;
                    height: 25px;
                    background: #fdf2f8;
                    border-radius: 0 0 20px 20px;
                }
                .candle {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 35px;
                    background: repeating-linear-gradient(
                        45deg,
                        #fff,
                        #fff 4px,
                        #3b82f6 4px,
                        #3b82f6 8px
                    );
                    border-radius: 2px;
                    z-index: 4;
                }
                .flame {
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 18px;
                    background: #fbbf24;
                    border-radius: 50% 50% 20% 20%;
                    animation: flicker 1s infinite alternate;
                    box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24;
                }
                @keyframes flicker {
                    0% { transform: translateX(-50%) scale(1); opacity: 1; }
                    100% { transform: translateX(-50%) scale(0.9); opacity: 0.8; }
                }
                .plate {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 280px;
                    height: 10px;
                    background: #e5e7eb;
                    border-radius: 50%;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                }
            `}</style>

            <motion.div 
                className="cake-body"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
            >
                <div className="plate"></div>
                
                <div className="layer layer-bottom">
                    <div className="icing"></div>
                    <div className="drip" style={{ left: '20px', height: '25px' }}></div>
                    <div className="drip" style={{ left: '60px', height: '20px' }}></div>
                    <div className="drip" style={{ left: '100px', height: '28px' }}></div>
                    <div className="drip" style={{ left: '150px', height: '22px' }}></div>
                    <div className="drip" style={{ left: '200px', height: '26px' }}></div>
                </div>
                
                <div className="layer layer-middle">
                    <div className="icing"></div>
                    <div className="drip" style={{ left: '15px', height: '20px' }}></div>
                    <div className="drip" style={{ left: '50px', height: '25px' }}></div>
                    <div className="drip" style={{ left: '90px', height: '18px' }}></div>
                    <div className="drip" style={{ left: '130px', height: '24px' }}></div>
                </div>
                
                <div className="layer layer-top">
                    <div className="icing"></div>
                    <div className="drip" style={{ left: '10px', height: '18px' }}></div>
                    <div className="drip" style={{ left: '40px', height: '22px' }}></div>
                    <div className="drip" style={{ left: '80px', height: '15px' }}></div>
                    
                    <div className="candle">
                        <div className="flame"></div>
                    </div>
                </div>
            </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
        >
            <h2 className="text-4xl md:text-6xl font-bold text-white handwritten mb-4 drop-shadow-lg">
                Happy Birthday!
            </h2>
            <p className="text-pink-200 text-xl">Make a wish! 🎂</p>
            <button 
                onClick={onClose}
                className="mt-8 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors border border-white/40"
            >
                Close
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cake;
