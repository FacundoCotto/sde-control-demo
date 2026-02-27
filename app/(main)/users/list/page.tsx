'use client';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { User } from '@/firebase/lib/realtimeDb';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { ProgressSpinner } from 'primereact/progressspinner';
import CreateUser from '@/components/users/crud/CreateUser';
import ReadUser from '@/components/users/crud/ReadUser';
import EditUser from '@/components/users/crud/EditUser';
import DeleteUser from '@/components/users/crud/DeleteUser';
import useUsers from '@/firebase/hooks/useUsers';

function List() {
    const [displayCreate, setDisplayCreate] = useState(false);
    const [activeDialog, setActiveDialog] = useState<'create' | 'read' | 'edit' | 'delete' | null>(null);
    const [selectedUser, setSelectedUser] = useState<User>({
        id: '',
        name: '',
        user: '',
        email: '',
        password: '',
        userType: '',
        panelUser: false,
        homePage: '',
        createdAt: '',
        updatedAt: ''
    });
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
    const { users, loading } = useUsers();

    const dt = useRef(null);
    const userType = [{ type: 'Administrador' }, { type: 'Usuario' }];

    useEffect(() => {
        initFilters();
    }, []);

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
                <Button type="button" icon="pi pi-user-plus" label="Add New" outlined className="w-full sm:w-auto flex-order-0 sm:flex-order-1" onClick={() => setDisplayCreate(true)} />
                <Dialog
                    modal
                    header="Create User"
                    closable={false}
                    style={{ width: '35vw', height: '55vh' }}
                    visible={displayCreate}
                    onHide={() => {
                        if (!displayCreate) return;
                        setDisplayCreate(false);
                    }}
                >
                    <CreateUser OnClose={() => setDisplayCreate(false)} />
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
        return <Dropdown value={selectedUserType} options={userType} onChange={(e) => onUserTypeFilterChange(e.value)} optionLabel="type" optionValue="type" placeholder="Tipo de Usuario" showClear />;
    };

    const textBodyTemplate = (user: User, field: keyof User, title: string) => (
        <>
            <span className="p-column-title">{title}</span>
            {user[field]}
        </>
    );

    const panelBodyTemplate = (user: User) => {
        return (
            <>
                <InputSwitch checked={user.panelUser} readOnly />
            </>
        );
    };

    const openDialog = (type: 'edit' | 'read' | 'delete', user: User) => {
        setSelectedUser(user);
        setActiveDialog(type); // un solo state en vez de 4 booleans
    };

    const actionsBodyTemplate = (user: User) => {
        return (
            <>
                <span className="p-column-title">Acciones</span>
                <div className="flex gap-2">
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        className="mr-2"
                        onClick={() => {
                            openDialog('edit', user);
                        }}
                    />
                    <Button
                        icon="pi pi-eye"
                        rounded
                        className="mr-2"
                        severity="warning"
                        onClick={() => {
                            openDialog('read', user);
                        }}
                    />
                    <Button icon="pi pi-lock" rounded className="mr-2" />
                    <Button
                        icon="pi pi-trash"
                        rounded
                        severity="danger"
                        onClick={() => {
                            openDialog('delete', user);
                            setSelectedUser(user);
                        }}
                    />
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
                <>
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
                        <Column field="name" sortable header="Nombre" body={(user) => textBodyTemplate(user, 'name', 'Nombre')} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                        <Column field="usuario" sortable header="Usuario" body={(user) => textBodyTemplate(user, 'user', 'Usuario')} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                        <Column field="email" sortable header="Email" body={(user) => textBodyTemplate(user, 'email', 'Email')} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                        <Column field="panelUser" sortable header="Panel" body={panelBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                        <Column field="userType" header={userTypeHeader} body={(user) => textBodyTemplate(user, 'userType', 'Tipo Usuario')} headerClassName="white-space-nowrap" style={{ width: '20%' }}></Column>
                        <Column field="actions" header="Acciones" body={actionsBodyTemplate} headerClassName="white-space-nowrap" style={{ width: '10%' }}></Column>
                    </DataTable>
                    <Dialog
                        modal
                        header="Edit User"
                        closable={true}
                        style={{ width: '35vw', height: '55vh' }}
                        visible={activeDialog === 'edit'}
                        onHide={() => {
                            setActiveDialog(null);
                        }}
                    >
                        <EditUser OnClose={() => setActiveDialog(null)} user={selectedUser} />
                    </Dialog>
                    <Dialog
                        modal
                        header="Read User"
                        closable={true}
                        style={{ width: '35vw', height: '55vh' }}
                        visible={activeDialog === 'read'}
                        onHide={() => {
                            setActiveDialog(null);
                        }}
                    >
                        <ReadUser OnClose={() => setActiveDialog(null)} user={selectedUser} />
                    </Dialog>
                    <Dialog
                        modal
                        header="Delete User"
                        closable={true}
                        style={{ width: '50vw', height: '25vh' }}
                        visible={activeDialog === 'delete'}
                        onHide={() => {
                            setActiveDialog(null);
                        }}
                    >
                        <DeleteUser OnClose={() => setActiveDialog(null)} user={selectedUser} />
                    </Dialog>
                </>
            )}
        </div>
    );
}

export default List;
