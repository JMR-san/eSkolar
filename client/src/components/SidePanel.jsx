export const SidePanel = () => {
    return <div>
        <div className="h-40 bg-sidebar-logo">
            <img 
                src="src/assets/eskolar.png" 
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