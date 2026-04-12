import React from 'react';
import { statsData } from '../data/mockData';

const DashboardMockup = ({ type = 'stats' }) => {
  if (type === 'stats') {
    return (
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-[#FAFAF8] rounded-lg">
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#6B6B6B]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'interviews') {
    const interviews = [
      { company: "TechCorp", role: "Senior Designer", time: "2:00 PM", isToday: true },
      { company: "StartupXYZ", role: "Product Lead", time: "10:30 AM", isToday: false },
      { company: "BigCompany", role: "UX Manager", time: "3:00 PM", isToday: false }
    ];

    return (
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-[#1C1C1C] mb-4">Upcoming Interviews</h3>
        <div className="space-y-3">
          {interviews.map((interview, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#FAFAF8] rounded-lg border border-gray-100 hover:border-[#D4A017] transition-colors"
            >
              <div className="flex-1">
                <div className="font-semibold text-[#1C1C1C]">{interview.company}</div>
                <div className="text-sm text-[#6B6B6B]">{interview.role}</div>
              </div>
              <div className="text-right">
                {interview.isToday && (
                  <span className="inline-block px-3 py-1 bg-[#D1FAE5] text-green-700 text-xs font-bold rounded-full mb-1">
                    TODAY
                  </span>
                )}
                <div className="text-sm font-medium text-[#1C1C1C]">{interview.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pipeline') {
    const stages = [
      { name: 'Applications', count: 42, color: '#D4A017' },
      { name: 'Screening', count: 18, color: '#6B6B6B' },
      { name: 'Interview', count: 8, color: '#10B981' },
      { name: 'Offer', count: 3, color: '#D4A017' }
    ];

    return (
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-[#1C1C1C] mb-6">Your Pipeline</h3>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1C1C1C]">{stage.name}</span>
                <span className="text-sm font-bold" style={{ color: stage.color }}>
                  {stage.count}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stage.count / 42) * 100}%`,
                    backgroundColor: stage.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardMockup;
