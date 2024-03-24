/**
 * @description 控制任务并发
 * @param {*} tasks 任务总队列
 * @param {*} limit 同一时间的任务数量限制数
 * @param {*} callback 所有任务完成后的回调
 * @returns promise
 */
const concurrencyControl = async (tasks, limit, callback) => {
    const result = [];
    const inProgress = new Set();

    for (const task of tasks) {
        const currentTask = task();
        result.push(currentTask);
        inProgress.add(currentTask);
        currentTask.finally(() => {
            inProgress.delete(currentTask);
        });

        if (inProgress.size >= limit) {
            await Promise.race(inProgress);
        }
    }
    return Promise.all(result).then(res => callback ? callback(res) : res);
};

const executeTask = (n, taskName) => {
    return new Promise((resolve, reject) => {
        console.log(`${taskName} start`);
        setTimeout(() => {
            console.log(`${taskName} end --- `);
            resolve({n, task: taskName});
        }, n * 1000);
    })
};

const tasks = [
    () => executeTask(1, 'task1'),
    () => executeTask(3, 'task2'),
    () => executeTask(5, 'task3'),
    () => executeTask(2, 'task4'),
    () => executeTask(4, 'task5'),
];


concurrencyControl(tasks, 1, (res) => {
    console.log('all tasks execute done!', res);
});