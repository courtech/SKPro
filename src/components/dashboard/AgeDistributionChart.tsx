import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgeData {
  ageGroup: string;
  count: number;
  percentage: number;
}

interface AgeDistributionProps {
  data: AgeData[];
  title: string;
}

export default function AgeDistributionChart({ data, title }: AgeDistributionProps) {
  return (
    <div className={title ? "bg-white rounded-lg shadow-sm p-5 h-full" : "h-full"}>
      {title && <h3 className="text-gray-800 font-medium mb-4">{title}</h3>}
      
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 'dataMax']} />
            <YAxis 
              dataKey="ageGroup" 
              type="category" 
              scale="band" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} members (${data.find(item => item.count === value)?.percentage}%)`,
                'Count'
              ]}
            />
            <Bar 
              dataKey="count" 
              fill="#4f46e5" 
              radius={[0, 4, 4, 0]} 
              barSize={24} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {title && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {data.map((item) => (
            <div key={item.ageGroup} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{item.ageGroup}</span>
              <div className="flex items-center">
                <span className="font-medium">{item.count}</span>
                <span className="text-gray-500 ml-1">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 