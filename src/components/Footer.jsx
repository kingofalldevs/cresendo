import React from 'react';
import { BarChart3, Globe } from 'lucide-react';

const Footer = () => (
  <footer style={{ background: '#f0fdf4', padding: '12rem 2rem 8rem', marginTop: 'auto' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>
        <div>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
            <BarChart3 size={16} className="text-emerald" />
            <span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '-0.02em' }}>CRESCENDO SUPPORT</span>
          </div>
          <p className="text-dim text-sm" style={{ lineHeight: 1.6, maxWidth: '300px' }}>
            A dedicated ecosystem for addiction recovery, providing visual momentum and context-aware support networks.
          </p>
        </div>

        <div>
          <h4 className="label-xs mb-4" style={{ fontSize: '0.8rem' }}>Product</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }} className="text-dim text-sm">
            <li><a href="#" className="footer-link">Recovery Terminal</a></li>
            <li><a href="#" className="footer-link">Trigger Mapper</a></li>
            <li><a href="#" className="footer-link">Community Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="label-xs mb-4" style={{ fontSize: '0.8rem' }}>Resources</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }} className="text-dim text-sm">
            <li><a href="#" className="footer-link">Documentation</a></li>
            <li><a href="#" className="footer-link">Methodology</a></li>
            <li><a href="#" className="footer-link">Support Hub</a></li>
          </ul>
        </div>

        <div>
          <h4 className="label-xs mb-4" style={{ fontSize: '0.8rem' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }} className="text-dim text-sm">
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Safety Guidelines</a></li>
          </ul>
        </div>
      </div>

      <div className="flex-between" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '2.5rem' }}>
        <p className="text-xs uppercase tracking-widest text-dim" style={{ opacity: 0.6 }}>
          © 2026 Crescendo. All rights reserved.
        </p>
        <div className="flex-center gap-4 text-xs uppercase tracking-widest text-dim" style={{ opacity: 0.8 }}>
          <div className="flex-center gap-2">
            <Globe size={14} />
            <span>English (US)</span>
          </div>
          <span style={{ margin: '0 0.5rem', opacity: 0.2 }}>|</span>
          <span>System Status: <span className="text-emerald" style={{ fontWeight: 800 }}>Normal</span></span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
