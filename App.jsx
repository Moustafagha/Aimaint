import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Activity, Settings, Users, BarChart3, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react';
import './App.css';

function App() {
  const [machines, setMachines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [predictiveData, setPredictiveData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setMachines([
      { id: 1, name: 'CNC Machine A', status: 'operational', lastMaintenance: '2024-01-15', nextMaintenance: '2024-02-15' },
      { id: 2, name: 'Conveyor Belt B', status: 'warning', lastMaintenance: '2024-01-10', nextMaintenance: '2024-02-10' },
      { id: 3, name: 'Hydraulic Press C', status: 'critical', lastMaintenance: '2024-01-05', nextMaintenance: '2024-02-05' },
    ]);

    setActivities([
      { id: 1, type: 'maintenance', machine: 'CNC Machine A', timestamp: '2024-01-20 10:30', status: 'completed' },
      { id: 2, type: 'inspection', machine: 'Conveyor Belt B', timestamp: '2024-01-19 14:15', status: 'pending' },
      { id: 3, type: 'repair', machine: 'Hydraulic Press C', timestamp: '2024-01-18 09:00', status: 'in_progress' },
    ]);

    setUsers([
      { id: 1, username: 'admin', email: 'admin@maintai.com', role: 'admin' },
      { id: 2, username: 'technician1', email: 'tech1@maintai.com', role: 'technician' },
      { id: 3, username: 'operator1', email: 'op1@maintai.com', role: 'operator' },
    ]);

    setPredictiveData([
      { id: 1, machine: 'CNC Machine A', prediction: 'Low risk', confidence: 95, nextFailure: '45 days' },
      { id: 2, machine: 'Conveyor Belt B', prediction: 'Medium risk', confidence: 78, nextFailure: '12 days' },
      { id: 3, machine: 'Hydraulic Press C', prediction: 'High risk', confidence: 89, nextFailure: '3 days' },
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      operational: 'default',
      warning: 'secondary',
      critical: 'destructive',
      completed: 'default',
      pending: 'secondary',
      in_progress: 'outline'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">SaaS Maintai</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Machines</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{machines.length}</div>
              <p className="text-xs text-muted-foreground">Active equipment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.filter(a => a.status !== 'completed').length}</div>
              <p className="text-xs text-muted-foreground">Ongoing tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{machines.filter(m => m.status === 'critical').length}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="machines" className="space-y-4">
          <TabsList>
            <TabsTrigger value="machines">Machines</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="machines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Machine Status</CardTitle>
                <CardDescription>Overview of all machines and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {machines.map((machine) => (
                    <div key={machine.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(machine.status)}
                        <div>
                          <h3 className="font-medium">{machine.name}</h3>
                          <p className="text-sm text-gray-500">Last maintenance: {machine.lastMaintenance}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(machine.status)}
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest maintenance and inspection activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">{activity.type} - {activity.machine}</h3>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(activity.status)}
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{user.role}</Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>AI-powered maintenance predictions and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveData.map((data) => (
                    <div key={data.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{data.machine}</h3>
                        <p className="text-sm text-gray-500">Predicted failure in: {data.nextFailure}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{data.prediction}</p>
                          <p className="text-sm text-gray-500">{data.confidence}% confidence</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;

