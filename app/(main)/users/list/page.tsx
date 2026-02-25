'use client';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import ProfileCreate from '../create/page';
import { getUsers, User, UserData } from '@/firebase/lib/realtimeDb';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { onValue, ref } from 'firebase/database';
import { db } from '@/firebase/lib/firebase';
import { ProgressSpinner } from 'primereact/progressspinner';

function List() {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

    const dt = useRef(null);
    const userType = [{ type: 'Administrador' }, { type: 'Usuario' }];

    useEffect(() => {
        initFilters();
    }, []);

    useEffect(() => {
        const usersRef = ref(db, 'usuarios');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const usersList = Object.entries(data).map(([id, userData]) => ({
                    id,
                    ...(userData as UserData)
                }));
                setUsers(usersList);
            } else {
                setUsers([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            user: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            email: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            userType: {
                value: null,
                matchMode: FilterMatchMode.EQUALS
            }
        });
        setGlobalFilterValue('');
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let _filters = { ...filters };
        (_filters['global'] as any).value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className="w-full" />
                </span>
                <Button type="button" icon="pi pi-user-plus" label="Add New" outlined className="w-full sm:w-auto flex-order-0 sm:flex-order-1" onClick={() => setDisplayBasic(true)} />
                <Dialog
                    modal
                    header="Create User"
                    closable={false}
                    style={{ width: '35vw', height: '55vh' }}
                    visible={displayBasic}
                    onHide={() => {
                        if (!displayBasic) return;
                        setDisplayBasic(false);
                    }}
                >
                    <ProfileCreate OnClose={() => setDisplayBasic(false)} />
                </Dialog>
            </div>
        );
    };

    const onUserTypeFilterChange = (value: string | null) => {
        setSelectedUserType(value);
        let _filters = { ...filters };
        (_filters['userType'] as any).value = value;
        setFilters(_filters);
    };

    const userTypeHeader = () => {
        return <Dropdown
        value={selectedUserType}
        options={userType}
        onChange={(e) => onUserTypeFilterChange(e.value)}
        optionLabel="type"
        optionValue="type"
        placeholder="Tipo de Usuario"
        showClear
        />;
    };

    const nameBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {user.name}
            </>
        );
    };
    const userBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Usuario</span>
                {user.user}
            </>
        );
    };

    const emailBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {user.email}
            </>
        );
    };

    const panelBodyTemplate = (user: User) => {
        return (
            <>
                <InputSwitch checked={user.panelUser} readOnly />
            </>
        );
    };

    const userTypeBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Tipo Usuario</span>
                {user.userType}
            </>
        );
    };

        const actionsBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Acciones</span>
                <div className="flex gap-2">
                    <Button icon="pi pi-pencil" rounded  className="mr-2" />
                    <Button icon="pi pi-eye" rounded  className="mr-2" severity='warning'/>
                    <Button icon="pi pi-lock" rounded  className="mr-2"  />
                    <Button icon="pi pi-trash" rounded severity="danger" />
                </div>
            </>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            {loading ? (
                <div className="flex justify-content-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <DataTable
                value={users}
                ref={dt}
                header={header}
                paginator
                rows={10}
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rowsPerPageOptions={[10, 25, 50]}
                loading={loading}
                filters={filters}
            >
                <Column field="name" sortable header="Nombre" body={nameBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                <Column field="usuario" sortable header="Usuario" body={userBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                <Column field="email" sortable header="Email" body={emailBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                <Column field="panelUser" sortable header="Panel" body={panelBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                <Column field="userType" header={userTypeHeader} body={userTypeBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                <Column field="actions" header="Acciones" body={actionsBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '10%' }}></Column>
            </DataTable>
            )}
        </div>
    );
}

export default List;
