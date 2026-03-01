// Chart data processing utilities

export const processDataForLineChart = (data, key = 'createdAt', limit = 30) => {
  if (!Array.isArray(data) || data.length === 0) {
    return generateDummyData(limit);
  }

  // Group by date
  const groupedByDate = data.reduce((acc, item) => {
    const date = new Date(item[key]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format
  return Object.entries(groupedByDate)
    .slice(-limit)
    .map(([date, count]) => ({ date, count }));
};

export const processCategoryData = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return [];
  }

  const categoryCount = blogs.reduce((acc, blog) => {
    const category = blog.cetagory?.name || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

export const processEngagementData = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return [
      { name: 'Likes', value: 0 },
      { name: 'Comments', value: 0 },
    ];
  }

  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
  const totalComments = blogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);

  return [
    { name: 'Likes', value: totalLikes },
    { name: 'Comments', value: totalComments },
  ];
};

export const processUserGrowthData = (users, limit = 30) => {
  if (!Array.isArray(users) || users.length === 0) {
    return generateDummyData(limit);
  }

  // Group users by registration date
  const groupedByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Calculate cumulative count
  let cumulative = 0;
  return Object.entries(groupedByDate)
    .slice(-limit)
    .map(([date, count]) => {
      cumulative += count;
      return { date, count: cumulative };
    });
};

export const calculateTrend = (current, previous) => {
  if (!previous || previous === 0) return { trend: 'up', value: '100%' };
  
  const change = ((current - previous) / previous) * 100;
  return {
    trend: change >= 0 ? 'up' : 'down',
    value: `${Math.abs(change).toFixed(1)}%`
  };
};

export const getTopPerformingBlogs = (blogs, metric = 'likes', limit = 5) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return [];
  }

  return [...blogs]
    .sort((a, b) => {
      const aValue = a[metric]?.length || 0;
      const bValue = b[metric]?.length || 0;
      return bValue - aValue;
    })
    .slice(0, limit);
};

// Generate dummy data for empty states
const generateDummyData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return data;
};

export const chartColors = {
  primary: '#0f172a',
  accent: '#0d9488',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  muted: '#64748b',
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
      backgroundColor: '#0f172a',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      borderRadius: 8,
    },
  },
};
