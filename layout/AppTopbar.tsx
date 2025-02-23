/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menuRight = useRef<Menu>(null);
    const router = useRouter();

    const items = [
        {
            label: 'Opciones',
            items: [
                {
                    label: 'Perfil',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Salir',
                    icon: 'pi pi-upload',
                    command: () => {
                        logoutUser();
                    }
                }
            ]
        }
    ];

    const logoutUser = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        router.push('auth/login')
    }

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>GESTION TAREAS</span>
            </Link>
            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                <button type="button" className="p-link layout-topbar-button" onClick={(event) => menuRight.current!.toggle(event)} aria-controls="popup_menu_right" aria-haspopup>
                    <i className="pi pi-user"></i>
                    
                </button>
                <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
