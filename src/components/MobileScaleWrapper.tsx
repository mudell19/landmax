interface MobileScaleWrapperProps {
  children: React.ReactNode;
}

export const MobileScaleWrapper = ({ children }: MobileScaleWrapperProps) => {
  return (
    <div className="mobile-scale-wrapper">
      {children}
    </div>
  );
};
