'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll for header background
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#services', label: t('services') },
    { href: '/#how-it-works', label: t('howItWorks') },
    { href: '/#pricing', label: t('pricing') },
    { href: '/#about', label: t('about') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="h-16 items-center justify-between hidden md:grid md:grid-cols-3">
          {/* Logo - Left column */}
          <div className="flex items-center">
            <Logo href="/" />
          </div>

          {/* Desktop Navigation - Center column */}
          <div className="flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions - Right column */}
          <div className="flex items-center justify-end gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/#contact">
              <Button size="sm">{t('contact')}</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile header */}
        <nav className="flex h-16 items-center justify-between md:hidden">
          <Logo href="/" />
          <button
            className="p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200',
            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">{t('contact')}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
