
import React from 'react';
import { CreditCard, Info, CheckCircle } from '@/icons';

type AccountStatusProps = {
  accountStatus: {
    exists: boolean;
    isOnboarded: boolean;
    accountId?: string;
  } | null;
};

const AccountStatusCard = ({ accountStatus }: AccountStatusProps) => {
  if (!accountStatus) return null;
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium mb-2">Account Status</h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <div className={`mr-2 ${accountStatus.exists ? 'text-green-500' : 'text-gray-400'}`}>
            {accountStatus.exists ? <CheckCircle size={18} /> : <Info size={18} />}
          </div>
          <span>Connect Account: {accountStatus.exists ? 'Created' : 'Not Created'}</span>
        </li>
        <li className="flex items-center">
          <div className={`mr-2 ${accountStatus.isOnboarded ? 'text-green-500' : 'text-gray-400'}`}>
            {accountStatus.isOnboarded ? <CheckCircle size={18} /> : <Info size={18} />}
          </div>
          <span>Onboarding Status: {accountStatus.isOnboarded ? 'Complete' : 'Incomplete'}</span>
        </li>
        {accountStatus.accountId && (
          <li className="flex items-center">
            <div className="mr-2 text-blue-500">
              <CreditCard size={18} />
            </div>
            <span>Account ID: {accountStatus.accountId}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AccountStatusCard;
