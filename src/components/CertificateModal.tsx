import React from 'react';
import { X, Printer, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { StudentPair } from '../types';
import { ASSETS } from '../data/casesData';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pair: StudentPair;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  pair,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-3xl bg-parchment rounded-2xl shadow-2xl border-8 border-[#5c3e21] p-6 md:p-10 text-slate-900 flex flex-col items-center print:border-4 print:p-6 print:m-0 print:max-w-none">
        
        {/* Close Button (Hidden in Print) */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/10 hover:bg-black/20 text-[#5c3e21] transition-colors cursor-pointer print:hidden"
          title="Fechar Certificado"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border Header */}
        <div className="text-center border-b-2 border-[#caa455] pb-4 mb-6 w-full flex flex-col items-center">
          <img 
            src={ASSETS.badge} 
            alt="Brasão da Agência WIT" 
            className="w-20 h-20 rounded-full border-4 border-[#caa455] shadow-lg mb-2 bg-amber-950"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-typewriter text-xs uppercase tracking-widest text-[#8c6747] font-bold">
            AGÊNCIA WIT DE INVESTIGAÇÃO TECNOLÓGICA
          </span>
          <h2 className="font-serif font-black text-2xl md:text-4xl text-[#4a2e12] tracking-wide mt-1">
            CERTIFICADO OFICIAL DE DETETIVE
          </h2>
          <span className="text-xs text-[#8c6747] font-semibold mt-1">
            ENSINO FUNDAMENTAL I · 2º ANO · AULA DE TECNOLOGIA
          </span>
        </div>

        {/* Body Text */}
        <div className="text-center space-y-4 my-2 max-w-xl font-sans">
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            Certificamos com louvor que a dupla de jovens investigadores mirins:
          </p>

          <div className="py-2 px-6 bg-[#fffdf5] border-2 border-dashed border-[#caa455] rounded-xl flex items-center justify-center gap-4 text-xl md:text-2xl font-serif font-black text-[#5c3e21]">
            <span>🔎 {pair.detectiveName}</span>
            <span className="text-amber-600 text-lg">&</span>
            <span>🧩 {pair.analystName}</span>
          </div>

          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-sans">
            Completaram com sucesso todos os desafios de lógica, sequências, programação e decodificação do <strong>CASO Nº 001: O Computador Bloqueado</strong>, recuperando o acesso seguro aos sistemas da Agência WIT.
          </p>
        </div>

        {/* Stamp & Signatures */}
        <div className="grid grid-cols-2 gap-8 w-full mt-6 pt-6 border-t-2 border-[#caa455] items-end text-center">
          <div className="flex flex-col items-center">
            <div className="stamp-resolved text-xs md:text-sm py-1 px-4 mb-2">
              ✓ APROVADO COM HONRAS
            </div>
            <span className="text-xs text-[#8c6747] font-typewriter">
              {currentDate}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="border-b border-[#5c3e21] w-40 pb-1 mb-1 font-serif italic text-sm text-[#4a2e12]">
              Detetive Chefe WIT
            </div>
            <span className="text-[11px] text-[#8c6747] font-typewriter uppercase">
              Comando Geral da Agência
            </span>
          </div>
        </div>

        {/* Print / Action Buttons (Hidden in Print) */}
        <div className="flex items-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#5c3e21] hover:bg-[#432b14] text-amber-100 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Certificado 🖨️</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2.5 bg-[#decbae] hover:bg-[#caa455] text-[#4a2e12] font-bold rounded-xl text-xs cursor-pointer transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
