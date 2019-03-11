import { observable, computed, action , flow } from "mobx";
import { getPhoneCode } from '@/services/api';

class Store {
    @observable start = Date.now();
    @observable current = Date.now();
    @observable state = "pending";
    @observable msg = false;

    @computed
    get elapsedTime() {
        return this.current - this.start + "milliseconds";
    }

    @action
    tick() {
        this.current = Date.now();
    }

    fetchProjects = flow(function * ({payload}) { // <- 注意*号，这是生成器函数！
        this.state = "pending"
        try {
            const projects = yield getPhoneCode(payload); // 用 yield 代替 await
            this.msg = projects;
            //const filteredProjects = somePreprocessing(projects)
            // 异步代码块会被自动包装成动作并修改状态
            this.state = "done"
            //this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    })
}

export default Store;