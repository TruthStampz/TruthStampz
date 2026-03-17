import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ArrowRight, Shield, Cpu, Lock, Fingerprint, Search } from "lucide-react";

export default function Landing() {
  return (
    <Layout>
      <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Hero Image / Glow */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Futuristic security abstract" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live on Hedera Mainnet
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
              Prove It's Yours. <br/>
              <span className="text-gradient-primary">Forever.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Notarize your content with military-grade AI analysis and immutable blockchain anchoring. 
              Protect your digital IP against deepfakes, theft, and generative AI scraping.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/stamp" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all duration-200 glow-primary"
              >
                Stamp Content <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/verify" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-200"
              >
                Verify a File <Search className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-24 bg-card/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How TruthStamp Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A seamless pipeline from your device to an immutable ledger, powered by advanced forensic AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Lock, title: "1. Upload & Hash", desc: "Your file never leaves your device unencrypted. We generate a SHA-256 fingerprint locally." },
              { icon: Cpu, title: "2. AI Forensic Analysis", desc: "Our models scan for GAN artifacts, altered EXIF data, and structural inconsistencies." },
              { icon: Shield, title: "3. Hedera Anchoring", desc: "The cryptographic proof and AI score are anchored to the Hedera Consensus Service." },
              { icon: Fingerprint, title: "4. Immutable Proof", desc: "Receive a permanent, verifiable Certificate of Authenticity you can share anywhere." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
