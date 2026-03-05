import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({children}){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar toggleSidebar={() =>setIsOpen(!isOpen)} />

            <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen ={isOpen}/>

                <main className="p-6 flex-1 overflow-y-auto">
                    {children}
                    </main>
            </div>
        </div>
    );
}

export default Layout;