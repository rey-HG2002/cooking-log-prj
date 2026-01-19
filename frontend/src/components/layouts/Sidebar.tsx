import React from "react";
import { Link, useLocation } from 'react-router-dom'

type SidebarProps = {
    onItemClick?: () => void;
};

// 共通のナビゲーション要素
export const SidebarContent = ({ onItemClick }: SidebarProps) => {
    // 現在のページ
    const location = useLocation();
    // メニュー項目
    const menuItems = [
        { label: "レシピ一覧", path: "/", icon: "📋" },
        { label: "レシピ登録", path: "/new", icon: "➕" },
        { label: "お気に入り", path: "/", icon: "❤️" },
        { label: "設定", path: "/", icon: "⚙️" },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <h1 className="text-xl font-bold text-primary">Cooking-log</h1>
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    onClick={onItemClick}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                                        ${isActive
                                            ? "bg-primary/80 dark:bg-primary/30 text-white shadow-sm"
                                            : "hover:bg-muted text-foreground"}
                                        `}
                                    >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-6 bottom-3 border-t border-border text-xs text-muted-foreground">
                @ 2025 Cooking-log
            </div>
        </div>
    );
};

// PC用サイドバー（常に表示）
export const DesktopSidebar = () => {
    return (
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
            <SidebarContent />
        </aside>
    );
};

// モバイル用サイドバー（ドロワー形式）
type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawer = ({ isOpen, onClose }: MobileSidebarProps) => {
    return (
        <div className="lg:hidden">
            {/* オーバーレイ */}
            <div
                className={`
                    fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
                onClick={onClose}
            />

            {/* サイドメニュー本体 */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-xl transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="h-full relative">
                    <SidebarContent onItemClick={onClose} />

                    {/* 閉じるボタン */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted cursor-pointer rounded-full"
                        aria-label="Close Sidebar"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};
