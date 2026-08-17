import React, { useState } from 'react';
import { UserSubscription } from '../types';

interface ConsoleUsersProps {
  users?: UserSubscription[];
}

export const ConsoleUsers: React.FC<ConsoleUsersProps> = ({ users = [] }) => {
  const defaultAdminUser: UserSubscription = {
    id: 'u-admin-master',
    name: 'Tharun Reddy',
    email: 'vallapureddytharunreddy6281@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    joinDate: 'Aug 2026',
    tier: 'CineVerse Master Admin',
    status: 'Active'
  };

  const masterList = users.length > 0 ? users : [defaultAdminUser];

  const [usersList, setUsersList] = useState<UserSubscription[]>(masterList);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'All' || u.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(item => item !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  return (
    <div id="console-users-page" className="p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">User & Subscription Management</h1>
          <p className="text-xs text-white/40 mt-1">
            Real registered subscriber accounts and Master Admin access control
          </p>
        </div>
      </div>

      {/* 3 REAL KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-white/40 uppercase tracking-wider">
            <span>Total Registered Users</span>
            <span className="material-symbols-outlined text-[#ff3e00]">group</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{usersList.length}</div>
          <p className="text-[11px] text-white/60 font-medium">Real registered user accounts</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-[#ff3e00]/40 space-y-2 shadow-lg shadow-[#ff3e00]/5">
          <div className="flex justify-between items-center text-xs font-bold text-[#ff3e00] uppercase tracking-wider">
            <span>Master Admin</span>
            <span className="material-symbols-outlined text-[#ff3e00]">verified_user</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-white truncate" title="vallapureddytharunreddy6281@gmail.com">
            vallapureddytharunreddy6281
          </div>
          <p className="text-[11px] text-white/60">Full Studio Console Authority</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-white/40 uppercase tracking-wider">
            <span>Active Memberships</span>
            <span className="material-symbols-outlined text-white/60">check_circle</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {usersList.filter(u => u.status === 'Active').length}
          </div>
          <p className="text-[11px] text-[#ff3e00] font-medium">100% active standing</p>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full bg-[#0a0a0a] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 border border-white/10 focus:border-[#ff3e00] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/40">Plan Tier:</label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 focus:outline-none"
              >
                <option value="All">All Tiers</option>
                <option value="CineVerse Master Admin">Master Admin</option>
                <option value="CineVerse AI VIP">CineVerse AI VIP</option>
                <option value="Free">Free</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="rounded-2xl bg-[#121212] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0a0a0a] text-[11px] font-bold text-white/40 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="accent-[#ff3e00] cursor-pointer rounded"
                  />
                </th>
                <th className="p-4">User</th>
                <th className="p-4">Join Date</th>
                <th className="p-4">Membership Tier</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-white/5 transition-colors ${isSelected ? 'bg-[#ff3e00]/10' : ''}`}
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleUser(user.id)}
                        className="accent-[#ff3e00] cursor-pointer rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/10"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#ff3e00]/15 text-[#ff3e00] font-bold flex items-center justify-center border border-[#ff3e00]/30 text-xs">
                            {user.initials || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            {user.name}
                            {user.email === 'vallapureddytharunreddy6281@gmail.com' && (
                              <span className="px-1.5 py-0.2 rounded bg-[#ff3e00] text-white text-[9px] font-black uppercase">Admin</span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/40 font-mono">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white/60 font-mono">
                      {user.joinDate}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff3e00]/20 border border-[#ff3e00]/40 text-[#ff3e00] text-[11px] font-bold">
                        {user.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-white border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e00]"></span>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#0a0a0a] text-xs text-white/40">
          <span>Showing {filteredUsers.length} registered member(s)</span>
        </div>
      </div>
    </div>
  );
};
