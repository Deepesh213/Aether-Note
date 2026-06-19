const PublicLayout = ({
  children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full dark:bg-[#0D0D0D]">
            {children}
        </div>
    );
}
 
export default PublicLayout;