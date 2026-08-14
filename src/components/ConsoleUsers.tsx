import React, { useState } from 'react';
import { USERS_DATA } from '../data/mockData';
import { UserSubscription } from '../types';

export const ConsoleUsers: React.FC = () => {
  const [usersList, setUsersList] = useState<UserSubscription[]>(USERS_DATA);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on query and filters
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

  const handleBulkAction = (action: 'message' | 'suspend') => {
    if (selectedUserIds.length === 0) return;
    if (action === 'suspend') {
      setUsersList(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'Suspended' } : u));
      alert(`Suspended ${selectedUserIds.length} user account(s).`);
      setSelectedUserIds([]);
    } else {
      alert(`Dispatched broadcast message to ${selectedUserIds.length} selected subscriber(s).`);
    }
  };

  return (
    <div id="console-users-page" className="p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">User & Subscription Management</h1>
          <p className="text-xs text-white/40 mt-1">
            Real-time subscriber tiers, cohort churn tracking, and membership administration
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Subscribers list exported as CSV.")}
            className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-white/40 uppercase tracking-wider">
            <span>Total Active Members</span>
            <span className="material-symbols-outlined text-[#ff3e00]">group</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">14,200</div>
          <p className="text-[11px] text-white/60 font-medium">+5.4% expansion this month</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-[#ff3e00]/40 space-y-2 shadow-lg shadow-[#ff3e00]/5">
          <div className="flex justify-between items-center text-xs font-bold text-[#ff3e00] uppercase tracking-wider">
            <span>CineVerse AI VIP Subscribers</span>
            <span className="material-symbols-outlined text-[#ff3e00]">auto_awesome</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">3,405</div>
          <p className="text-[11px] text-white/60">24% of overall audience base</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-white/40 uppercase tracking-wider">
            <span>Net Monthly Churn</span>
            <span className="material-symbols-outlined text-white/60">trending_down</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">2.4%</div>
          <p className="text-[11px] text-[#ff3e00] font-medium">-0.2% improvement vs Q1</p>
        </div>
      </div>

      {/* SEARCH, FILTERS & BULK ACTIONS BAR */}
      <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/40">Plan Tier:</label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 focus:outline-none"
              >
                <option value="All">All Tiers</option>
                <option value="CineVerse AI VIP">CineVerse AI VIP</option>
                <option value="Pro">Pro</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-white/40">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/80 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Canceled">Canceled</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions (When items selected) */}
        {selectedUserIds.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#ff3e00]/10 border border-[#ff3e00]/30 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-white">
              {selectedUserIds.length} user{selectedUserIds.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction('message')}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-black hover:bg-[#ff3e00] hover:text-white transition-colors cursor-pointer"
              >
                Message Users
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-1.5 rounded-lg bg-[#ff3e00]/20 text-[#ff3e00] border border-[#ff3e00]/40 text-xs font-semibold hover:bg-[#ff3e00]/30 transition-colors cursor-pointer"
              >
                Suspend Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* USERS DATA TABLE */}
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
                <th className="p-4 text-right">Actions</th>
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
                          <div className="font-bold text-white">{user.name}</div>
                          <div className="text-[11px] text-white/40">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white/60 font-mono">
                      {user.joinDate}
                    </td>
                    <td className="p-4">
                      {user.tier === 'CineVerse AI VIP' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff3e00]/20 border border-[#ff3e00]/40 text-[#ff3e00] text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                          {user.tier}
                        </span>
                      ) : user.tier === 'Pro' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold">
                          Pro HD
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/5 text-white/40 text-[11px]">
                          Free Tier
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        user.status === 'Active'
                          ? 'bg-white/10 text-white border border-white/20'
                          : user.status === 'Canceled'
                          ? 'bg-white/5 text-white/40'
                          : 'bg-[#ff3e00]/15 text-[#ff3e00] border border-[#ff3e00]/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Active' ? 'bg-[#ff3e00]' : user.status === 'Canceled' ? 'bg-white/40' : 'bg-[#ff3e00]'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => alert(`Opening subscriber profile: ${user.name}`)}
                        className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="Manage"
                      >
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#0a0a0a] text-xs text-white/40">
          <span>Showing 1 to {filteredUsers.length} of 14,200 entries</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-3 py-1 rounded-lg bg-[#181818] hover:bg-white/10 text-white border border-white/10 cursor-pointer disabled:opacity-40"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-2 font-mono text-white">Page {currentPage} of 89</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded-lg bg-[#181818] hover:bg-white/10 text-white border border-white/10 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
