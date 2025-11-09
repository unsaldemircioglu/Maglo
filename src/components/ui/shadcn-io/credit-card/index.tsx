'use client';

import { cn } from '@/lib/utils';
import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

// Hover desteği kontrolü
const useSupportsHover = () => {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover)');
    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches);

    setSupportsHover(mql.matches);
    mql.addEventListener('change', handler);

    return () => mql.removeEventListener('change', handler);
  }, []);

  return supportsHover;
};

// Kart bileşenleri
export type CreditCardProps = HTMLAttributes<HTMLDivElement>;

export const CreditCard = ({ className, ...props }: CreditCardProps) => (
  <div
    className={cn(
      'group/kibo-credit-card perspective-distant aspect-[8560/5398] w-full max-w-96 text-white',
      '@container',
      className
    )}
    {...props}
  />
);

const CreditCardFlipContext = createContext(false);

export type CreditCardFlipperProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const CreditCardFlipper = ({
  className,
  children,
  ...props
}: CreditCardFlipperProps) => {
  const supportsHover = useSupportsHover();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!supportsHover) {
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <CreditCardFlipContext.Provider value={true}>
      {/* biome-ignore lint/nursery/noStaticElementInteractions: tap to flip for touch devices */}
      <div
        onClick={handleClick}
        aria-label="Flip credit card"
        className={cn(
          'h-full w-full',
          '@xs:rounded-2xl rounded-lg',
          'transform-3d transition duration-700 ease-in-out',
          supportsHover &&
            'group-hover/kibo-credit-card:-rotate-y-180 group-hover/kibo-credit-card:shadow-lg',
          !supportsHover && isFlipped && '-rotate-y-180 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CreditCardFlipContext.Provider>
  );
};

// Diğer alt bileşenler
export type CreditCardNameProps = HTMLAttributes<HTMLParagraphElement>;
export const CreditCardName = ({ className, style, ...props }: CreditCardNameProps) => (
  <p className={cn('font-semibold uppercase', className)} style={{ lineHeight: '100%', ...style }} {...props} />
);

export type CreditCardChipProps = HTMLAttributes<SVGSVGElement>;
export const CreditCardChip = ({ className, children, ...props }: CreditCardChipProps) =>
  children ? (
    <div className={cn('-translate-y-1/2 absolute top-1/2 left-0 w-1/6 shrink-0 rounded-[18%]', className)}>
      {children}
    </div>
  ) : (
    <svg
      enableBackground="new 0 0 110 92"
      viewBox="0 0 110 92"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('-translate-y-1/2 absolute top-1/2 left-0 w-1/6 shrink-0 rounded-[18%]', className)}
      {...props}
    >
      <title>Chip</title>
      <path
        fill="url(#kibo-credit-card-chip-gradient)"
        d="M1 13A12 12 0 0 1 13 1h84a12 12 0 0 1 12 12v66a12 12 0 0 1-12 12H13A12 12 0 0 1 1 79V13Z"
      />
      <defs>
        <linearGradient id="kibo-credit-card-chip-gradient" x1="1" x2="112.7" y1="46" y2="78.12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDE5A6" />
          <stop offset="1" stopColor="#CFA255" />
        </linearGradient>
      </defs>
    </svg>
  );

export type CreditCardLogoProps = HTMLAttributes<HTMLDivElement>;
export const CreditCardLogo = ({ className, ...props }: CreditCardLogoProps) => (
  <div className={cn('absolute top-0 right-0 size-1/6', className)} {...props} />
);

export type CreditCardFrontProps = HTMLAttributes<HTMLDivElement> & { safeArea?: number };
export const CreditCardFront = ({ className, safeArea = 20, children, ...props }: CreditCardFrontProps) => (
  <div
    className={cn('backface-hidden absolute inset-0 flex overflow-hidden bg-foreground/90', '@xs:rounded-2xl rounded-lg', className)}
    {...props}
  >
    <div className="relative flex-1" style={{ margin: `${safeArea}px` }}>
      {children}
    </div>
  </div>
);

export type CreditCardServiceProviderProps = ComponentProps<typeof PaymentIcon>;
export const CreditCardServiceProvider = ({ className, children, type = 'Visa', ...props }: CreditCardServiceProviderProps) =>
  children ? (
    <div className={cn('absolute right-0 bottom-0', 'max-h-1/3 max-w-1/3', className)}>{children}</div>
  ) : (
    <PaymentIcon type={type} className={cn('absolute right-0 bottom-0', 'max-h-1/3 max-w-1/3', className)} {...props} />
  );

const CreditCardBackContext = createContext<{ safeArea: number }>({ safeArea: 20 });

export type CreditCardBackProps = HTMLAttributes<HTMLDivElement> & { safeArea?: number };
export const CreditCardBack = ({ safeArea = 16, children, className, ...props }: CreditCardBackProps) => {
  const isInsideFlipper = useContext(CreditCardFlipContext);

  return (
    <CreditCardBackContext.Provider value={{ safeArea }}>
      <div
        className={cn(
          'backface-hidden absolute inset-0 flex overflow-hidden bg-foreground/90',
          '@xs:rounded-2xl rounded-lg',
          isInsideFlipper && 'rotate-y-180',
          className
        )}
        {...props}
      >
        <div className="relative flex-1" style={{ margin: `${safeArea}px` }}>
          {children}
        </div>
      </div>
    </CreditCardBackContext.Provider>
  );
};

export type CreditCardMagStripeProps = HTMLAttributes<HTMLDivElement>;
export const CreditCardMagStripe = ({ className, ...props }: CreditCardMagStripeProps) => {
  const context = useContext(CreditCardBackContext);

  return (
    <div
      className={cn('-translate-x-1/2 absolute top-[3%] left-1/2 h-1/4 bg-gray-900', className)}
      style={{ width: `calc(100% + 2 * ${context.safeArea}px)` }}
      {...props}
    />
  );
};

export type CreditCardNumberProps = HTMLAttributes<HTMLParagraphElement>;
export const CreditCardNumber = ({ className, children, style, ...props }: CreditCardNumberProps) => (
  <p className={cn('font-mono', '@xs:text-2xl', className)} style={{ lineHeight: '100%', ...style }} {...props}>
    {children}
  </p>
);

export type CreditCardExpiryProps = HTMLAttributes<HTMLParagraphElement>;
export const CreditCardExpiry = ({ className, style, ...props }: CreditCardExpiryProps) => (
  <p className={cn('font-mono', className)} style={{ lineHeight: '100%', ...style }} {...props} />
);

export type CreditCardCvvProps = HTMLAttributes<HTMLParagraphElement>;
export const CreditCardCvv = ({ className, style, ...props }: CreditCardCvvProps) => (
  <p className={cn('font-mono', className)} style={{ lineHeight: '100%', ...style }} {...props} />
);
