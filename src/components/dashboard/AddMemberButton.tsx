import React from 'react';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default function AddMemberButton() {
  return (
    <Link 
      href="/members/add" 
      className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium text-sm"
    >
      <UserPlus className="h-4 w-4 mr-2" />
      Add Member
    </Link>
  );
} 