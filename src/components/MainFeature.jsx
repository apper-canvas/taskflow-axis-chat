import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  })

// Sample tasks data
  const sampleTasks = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the quarterly project proposal and submit to stakeholders for review',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-20',
      createdAt: '2024-12-15T10:00:00Z',
      updatedAt: '2024-12-16T14:30:00Z'
    },
    {
      id: '2',
      title: 'Review team performance metrics',
      description: 'Analyze Q4 performance data and prepare feedback for team members',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-18',
      createdAt: '2024-12-14T09:15:00Z',
      updatedAt: '2024-12-14T09:15:00Z'
    },
    {
      id: '3',
      title: 'Update website content',
      description: 'Refresh homepage content and update product descriptions',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-15',
      createdAt: '2024-12-10T16:20:00Z',
      updatedAt: '2024-12-15T11:45:00Z'
    },
    {
      id: '4',
      title: 'Schedule client meetings',
      description: 'Coordinate with top 5 clients for next quarter planning sessions',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-17',
      createdAt: '2024-12-12T08:30:00Z',
      updatedAt: '2024-12-12T08:30:00Z'
    },
    {
      id: '5',
      title: 'Prepare budget report',
      description: 'Compile annual budget analysis and variance report for management',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-22',
      createdAt: '2024-12-13T13:10:00Z',
      updatedAt: '2024-12-16T16:20:00Z'
    },
    {
      id: '6',
      title: 'Organize team building event',
      description: 'Plan and book venue for end-of-year team celebration',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-25',
      createdAt: '2024-12-11T12:00:00Z',
      updatedAt: '2024-12-11T12:00:00Z'
    },
    {
      id: '7',
      title: 'Update security protocols',
      description: 'Review and implement new cybersecurity measures across all systems',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-19',
      createdAt: '2024-12-14T15:45:00Z',
      updatedAt: '2024-12-14T15:45:00Z'
    },
    {
      id: '8',
      title: 'Clean up email inbox',
      description: 'Archive old emails and organize important correspondence',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-14',
      createdAt: '2024-12-13T18:30:00Z',
      updatedAt: '2024-12-14T10:15:00Z'
    },
    {
      id: '9',
      title: 'Conduct market research',
      description: 'Research competitor pricing and market trends for new product launch',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-12-21',
      createdAt: '2024-12-12T14:20:00Z',
      updatedAt: '2024-12-16T09:30:00Z'
    },
    {
      id: '10',
      title: 'Fix bug in mobile app',
      description: 'Resolve critical login issue affecting iOS users',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-12-16',
      createdAt: '2024-12-15T11:00:00Z',
      updatedAt: '2024-12-16T13:45:00Z'
    },
    {
      id: '11',
      title: 'Write blog post about AI trends',
      description: 'Create comprehensive article on emerging AI technologies in our industry',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-23',
      createdAt: '2024-12-14T16:30:00Z',
      updatedAt: '2024-12-14T16:30:00Z'
    },
    {
      id: '12',
      title: 'Backup important files',
      description: 'Create secure backup of all project files and databases',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-13',
      createdAt: '2024-12-12T19:15:00Z',
      updatedAt: '2024-12-13T08:20:00Z'
    },
    {
      id: '13',
      title: 'Interview new candidates',
      description: 'Conduct final interviews for senior developer positions',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-20',
      createdAt: '2024-12-13T10:45:00Z',
      updatedAt: '2024-12-13T10:45:00Z'
    },
    {
      id: '14',
      title: 'Update documentation',
      description: 'Revise API documentation and user guides for latest release',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-12-24',
      createdAt: '2024-12-11T14:10:00Z',
      updatedAt: '2024-12-16T12:30:00Z'
    },
    {
      id: '15',
      title: 'Plan Christmas vacation',
      description: 'Book flights and accommodation for holiday trip',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-12-18',
      createdAt: '2024-12-10T20:00:00Z',
      updatedAt: '2024-12-10T20:00:00Z'
    },
    {
      id: '16',
      title: 'Review contract proposals',
      description: 'Analyze and provide feedback on three vendor contract proposals',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-12-15',
      createdAt: '2024-12-13T11:30:00Z',
      updatedAt: '2024-12-15T17:20:00Z'
    },
    {
      id: '17',
      title: 'Optimize database performance',
      description: 'Identify and resolve slow queries affecting application performance',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-19',
      createdAt: '2024-12-14T09:00:00Z',
      updatedAt: '2024-12-16T15:45:00Z'
    },
    {
      id: '18',
      title: 'Create training materials',
      description: 'Develop onboarding resources for new team members',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-26',
      createdAt: '2024-12-12T13:20:00Z',
      updatedAt: '2024-12-12T13:20:00Z'
    },
    {
      id: '19',
      title: 'Submit expense reports',
      description: 'Compile and submit Q4 business expense documentation',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-12',
      createdAt: '2024-12-11T16:40:00Z',
      updatedAt: '2024-12-12T14:10:00Z'
    },
    {
      id: '20',
      title: 'Design new product mockups',
      description: 'Create visual concepts for upcoming product launch',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-12-21',
      createdAt: '2024-12-13T12:15:00Z',
      updatedAt: '2024-12-16T10:30:00Z'
    },
    {
      id: '21',
      title: 'Audit inventory systems',
      description: 'Verify accuracy of warehouse inventory tracking',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-17',
      createdAt: '2024-12-14T08:45:00Z',
      updatedAt: '2024-12-14T08:45:00Z'
    },
    {
      id: '22',
      title: 'Respond to customer feedback',
      description: 'Address recent customer service inquiries and complaints',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-12-16',
      createdAt: '2024-12-15T14:20:00Z',
      updatedAt: '2024-12-16T11:30:00Z'
    },
    {
      id: '23',
      title: 'Test new software features',
      description: 'Perform quality assurance testing on latest development build',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-18',
      createdAt: '2024-12-15T13:00:00Z',
      updatedAt: '2024-12-16T16:45:00Z'
    },
    {
      id: '24',
      title: 'Update social media profiles',
      description: 'Refresh company social media presence and post new content',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-12-22',
      createdAt: '2024-12-13T17:30:00Z',
      updatedAt: '2024-12-13T17:30:00Z'
    },
    {
      id: '25',
      title: 'Analyze sales data',
      description: 'Generate comprehensive sales performance report for stakeholders',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-20',
      createdAt: '2024-12-14T10:15:00Z',
      updatedAt: '2024-12-14T10:15:00Z'
    },
    {
      id: '26',
      title: 'Renew software licenses',
      description: 'Process renewals for expiring software subscriptions',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-12-14',
      createdAt: '2024-12-12T15:50:00Z',
      updatedAt: '2024-12-14T09:25:00Z'
    },
    {
      id: '27',
      title: 'Schedule equipment maintenance',
      description: 'Arrange quarterly maintenance for office equipment and servers',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-12-27',
      createdAt: '2024-12-11T11:20:00Z',
      updatedAt: '2024-12-11T11:20:00Z'
    },
    {
      id: '28',
      title: 'Review privacy policies',
      description: 'Update privacy policies to comply with latest regulations',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-12-19',
      createdAt: '2024-12-13T16:10:00Z',
      updatedAt: '2024-12-16T14:15:00Z'
    },
    {
      id: '29',
      title: 'Organize office supplies',
      description: 'Inventory and reorder necessary office supplies for next quarter',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-12-13',
      createdAt: '2024-12-12T12:30:00Z',
      updatedAt: '2024-12-13T15:40:00Z'
    },
    {
      id: '30',
      title: 'Plan Q1 product roadmap',
      description: 'Define priorities and timeline for first quarter product development',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-23',
      createdAt: '2024-12-14T11:45:00Z',
      updatedAt: '2024-12-14T11:45:00Z'
    },
    {
      id: '31',
      title: 'Conduct user experience research',
      description: 'Survey customers and analyze user behavior patterns',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-12-25',
      createdAt: '2024-12-12T18:20:00Z',
      updatedAt: '2024-12-16T13:10:00Z'
    },
    {
      id: '32',
      title: 'Prepare year-end presentation',
      description: 'Create comprehensive presentation summarizing annual achievements',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-12-28',
      createdAt: '2024-12-15T12:40:00Z',
      updatedAt: '2024-12-15T12:40:00Z'
    }
  ]

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      // Load sample data if no saved tasks exist
      setTasks(sampleTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a task title')
      return
    }

    const newTask = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (selectedTask) {
      setTasks(prev => prev.map(task => 
        task.id === selectedTask.id 
          ? { ...newTask, id: selectedTask.id, createdAt: selectedTask.createdAt }
          : task
      ))
      toast.success('Task updated successfully!')
      setSelectedTask(null)
    } else {
      setTasks(prev => [...prev, newTask])
      toast.success('Task created successfully!')
    }

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    })
    setShowForm(false)
  }

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status
    })
    setSelectedTask(task)
    setShowForm(true)
  }

  const handleDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    toast.success('Task deleted successfully!')
  }

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed'
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date().toISOString()
        }
      }
      return task
    }))
  }

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filter === 'all') return true
      if (filter === 'today') return task.dueDate && isToday(new Date(task.dueDate))
      if (filter === 'overdue') return task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'completed'
      return task.status === filter
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      if (sortBy === 'status') {
        const statusOrder = { pending: 1, 'in-progress': 2, completed: 3 }
        return statusOrder[a.status] - statusOrder[b.status]
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertCircle'
      case 'medium': return 'Clock'
      case 'low': return 'Minus'
      default: return 'Minus'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-amber-500'
      case 'low': return 'text-green-500'
      default: return 'text-surface-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle2'
      case 'in-progress': return 'Play'
      case 'pending': return 'Circle'
      default: return 'Circle'
    }
  }

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null
    const date = new Date(dueDate)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isPast(date)) return `Overdue (${format(date, 'MMM d')})`
    return format(date, 'MMM d, yyyy')
  }

  const getTaskStats = () => {
    const completed = tasks.filter(task => task.status === 'completed').length
    const inProgress = tasks.filter(task => task.status === 'in-progress').length
    const pending = tasks.filter(task => task.status === 'pending').length
    const overdue = tasks.filter(task => 
      task.dueDate && 
      isPast(new Date(task.dueDate)) && 
      task.status !== 'completed'
    ).length

    return { completed, inProgress, pending, overdue, total: tasks.length }
  }

  const stats = getTaskStats()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8"
      >
        {[
          { label: 'Total', value: stats.total, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Completed', value: stats.completed, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/20' },
          { label: 'Overdue', value: stats.overdue, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`${stat.bg} rounded-xl p-3 md:p-4 text-center border border-surface-200/50 dark:border-surface-700/50`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <p className={`text-xl md:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-xs md:text-sm text-surface-600 dark:text-surface-400 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glassmorphism rounded-2xl p-4 md:p-6 mb-6 md:mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input text-sm"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="today">Due Today</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input text-sm"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
              <option value="created">Sort by Created</option>
            </select>

            <motion.button
              onClick={() => {
                setShowForm(true)
                setSelectedTask(null)
                setFormData({
                  title: '',
                  description: '',
                  priority: 'medium',
                  dueDate: '',
                  status: 'pending'
                })
              }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Plus" className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  {selectedTask ? 'Edit Task' : 'Create New Task'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="form-input resize-none"
                    rows="3"
                    placeholder="Add task description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="form-input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="form-input"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-semibold hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedTask ? 'Update Task' : 'Create Task'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAndSortedTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                <ApperIcon name="ListTodo" className="w-10 h-10 text-surface-400" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                {searchTerm || filter !== 'all' ? 'No matching tasks found' : 'No tasks yet'}
              </h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first task to get started with TaskFlow'
                }
              </p>
              {!searchTerm && filter === 'all' && (
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Your First Task
                </motion.button>
              )}
            </motion.div>
          ) : (
            filteredAndSortedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="task-card relative group"
                whileHover={{ y: -2 }}
              >
                <div className={`priority-indicator priority-${task.priority}`} />
                
                <div className="flex items-start gap-4">
                  <motion.button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 ${
                      task.status === 'completed' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-400 hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ApperIcon name={getStatusIcon(task.status)} className="w-5 h-5" />
                  </motion.button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className={`text-lg font-semibold transition-all duration-300 ${
                        task.status === 'completed' 
                          ? 'line-through text-surface-500 dark:text-surface-400' 
                          : 'text-surface-900 dark:text-surface-100'
                      }`}>
                        {task.title}
                      </h4>
                      
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getPriorityColor(task.priority)}`}>
                          <ApperIcon name={getPriorityIcon(task.priority)} className="w-4 h-4" />
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                          <motion.button
                            onClick={() => handleEdit(task)}
                            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ApperIcon name="Edit2" className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-500 hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-surface-600 dark:text-surface-400 mb-3 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`status-badge status-${task.status}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      
                      {task.dueDate && (
                        <div className={`flex items-center space-x-1 text-sm ${
                          isPast(new Date(task.dueDate)) && task.status !== 'completed'
                            ? 'text-red-500'
                            : isToday(new Date(task.dueDate))
                            ? 'text-primary'
                            : 'text-surface-500'
                        }`}>
                          <ApperIcon name="Calendar" className="w-4 h-4" />
                          <span className="font-medium">{formatDueDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainFeature