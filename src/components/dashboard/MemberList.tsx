import React from 'react';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  avatarText: string;
  status: 'active' | 'pending' | 'inactive';
}

interface MemberListProps {
  members: Member[];
  title: string;
  viewAllLink: string;
}

export default function MemberList({ members, title, viewAllLink }: MemberListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 font-medium">{title}</h3>
        <Link 
          href={viewAllLink} 
          className="text-sm text-blue-600 font-medium hover:text-blue-800"
        >
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                {member.avatarText}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.address}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2
                ${member.status === 'active' ? 'bg-green-100 text-green-800' : 
                  member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}`}
              >
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
              <div className="text-xs text-gray-500 mr-2">
                {member.createdAt}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 