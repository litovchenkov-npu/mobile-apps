import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Контекст управління завданнями
const TaskContext = createContext();
// Контекст управління темою
const ThemeContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // Завантаження завдань з localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    // Збереження завдань у localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Додавання нового завдання
    const addTask = useCallback((text) => {
        setTasks(prev => [...prev, { id: Date.now().toString(), text, completed: false }]);
    }, []);

    // Зміна стану виконання завдання
    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    }, []);

    // Видалення завдання
    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);

    // Фільтрація завдань
    const filteredTasks = useMemo(() => {
        return filter === 'all' ? tasks : tasks.filter(task => filter === 'active' ? !task.completed : task.completed);
    }, [tasks, filter]);

    return (
        <TaskContext.Provider value={{ tasks: filteredTasks, addTask, toggleTask, deleteTask, setFilter }}>
            {children}
        </TaskContext.Provider>
    );
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Завантаження теми з localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
    }, []);

    // Збереження теми у localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Відображення списку завдань
const TaskList = () => {
    const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <TouchableOpacity onPress={() => toggleTask(item.id)}>
                        <Text style={item.completed ? styles.completed : styles.taskText}>{item.text}</Text>
                    </TouchableOpacity>
                    <Button title="Видалити" onPress={() => deleteTask(item.id)} />
                </View>
            )}
        />
    );
};

// Введення нового завдання
const TaskInput = () => {
    const { addTask } = useContext(TaskContext);
    const [text, setText] = useState('');
    const inputRef = useRef();

    const handleAddTask = () => {
        if (text.trim()) {
            addTask(text);
            setText('');
            inputRef.current.focus();
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput ref={inputRef} value={text} onChangeText={setText} style={styles.input} placeholder="Додати завдання..." />
            <Button title="Додати" onPress={handleAddTask} />
        </View>
    );
};

// Фільтрація завдань
const TaskFilter = () => {
    const { setFilter } = useContext(TaskContext);
    return (
        <View style={styles.filterContainer}>
            <Button title="Все" onPress={() => setFilter('all')} />
            <Button title="Активні" onPress={() => setFilter('active')} />
            <Button title="Виконані" onPress={() => setFilter('completed')} />
        </View>
    );
};

// Змінення теми теми
const ThemeSwitcher = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div>
            <Button title={`${theme === 'light' ? 'Світла' : 'Темна'} тема`} onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </div>
    );
};

export default function App() {
    return (
        <ThemeProvider>
            <TaskProvider>
                <ThemedApp />
            </TaskProvider>
        </ThemeProvider>
    );
}

const ThemedApp = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
            <Text style={styles.header}>Управління завданнями</Text>
            <ThemeSwitcher />
            <TaskInput />
            <TaskFilter />
            <TaskList />
        </View>
    );
};


const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 24,
        gap: 16,
        // maxWidth: 900,
        // width: '100%',
        // margin: 'auto'
    },

    lightTheme: {
        backgroundColor: '#fff',
        color: '#000'
    },

    darkTheme: {
        backgroundColor: '#666',
        color: '#fff'
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8
    },
    
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 8
    },

    input: {
        flex: 1,
        borderBottomWidth: 1,
        marginRight: 8,
        padding: 5
    },

    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#fff',
        marginBottom: 5,
        flexWrap: 'wrap'
    },

    taskText: { fontSize: 16 },

    completed: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: 'gray'
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8
    },
});