'use client';

import { useEffect } from 'react';
import pangu from 'pangu/browser';
import { usePathname } from 'next/navigation';

export function PanguProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    pangu.autoSpacingPage();
  }, [pathname]);

  return <>{children}</>;
}
