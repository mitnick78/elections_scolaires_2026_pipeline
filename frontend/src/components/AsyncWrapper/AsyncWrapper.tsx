interface AsyncWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  loadingMessage?: string;
}

const AsyncWrapper = ({
  loading,
  error,
  children,
  loadingMessage = "Chargement...",
}: AsyncWrapperProps) => {
  if (loading) {
    return (
      <div className="fr-callout">
        <p className="fr-callout__text">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fr-alert fr-alert--error">
        <p>{error}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AsyncWrapper;
