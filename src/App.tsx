/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { About } from './components/About';
import { OrderSection } from './components/OrderSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DesignDetailModal } from './components/DesignDetailModal';
import { OrderModal } from './components/OrderModal';
import { AdminModal } from './components/AdminModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#080d1a] text-[#f1f5f9] flex flex-col font-sans selection:bg-[#1d4ed8]/40 selection:text-[#93c5fd]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <OrderSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Action Widget */}
        <FloatingWhatsApp />

        {/* Global Floating Modals & Dialogs */}
        <DesignDetailModal />
        <OrderModal />
        <AdminModal />
        <DeploymentGuideModal />
      </div>
    </PortfolioProvider>
  );
}
