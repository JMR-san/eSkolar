export const SidePanel = () => {
    return <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/pylon.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: '60% 40%',
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: 'none',
        }} />
        <div className="h-40 bg-sidebar-logo" style={{ position: 'relative', zIndex: 1 }}>
            <img 
                src="/eskolar.png" 
                alt="eskolar" 
                className="w-full h-full object-contain dark:invert dark:brightness-0 dark:contrast-200"
            />
            <div className="text-sidebar-text p-2">
                <p>
                    A Centralized Scholarship Discovery System for PUP Students Using Hybrid Algorithmic Approaches
                </p>    
            </div>
        </div>
        
    </div>;
};