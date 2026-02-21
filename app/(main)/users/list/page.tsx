'use client';
import { useRouter } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import ProfileCreate from '../create/page';
import { getUsers, User } from '@/firebase/lib/realtimeDb';

function List() {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const router = useRouter();
    const dt = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
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
            'country.name': {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
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
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Global Search" className="w-full" />
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
                    <ProfileCreate OnClose={() => setDisplayBasic(false)}/>
                </Dialog>
            </div>
        );
    };



    const header = renderHeader();

    return (
        <div className="card">
            <DataTable ref={dt} header={header} paginator rows={10} responsiveLayout="scroll" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]} filters={filters} loading={loading}>
                <Column field="name" header="Name"></Column>
                <Column field="usuario" header="Usuario"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="panel" header="Activity"></Column>
            </DataTable>
        </div>
    );
}

export default List;
