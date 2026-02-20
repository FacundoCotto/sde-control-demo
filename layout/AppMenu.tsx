import AppSubMenu from './AppSubMenu';
import type { MenuModel } from '@/types';

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: 'User Management',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    to: '/users/list'
                },
                {
                    label: 'Create',
                    icon: 'pi pi-fw pi-plus',
                    to: '/users/create'
                }
            ]
        }
    ];
    return <AppSubMenu model={model} />;
};

export default AppMenu;
