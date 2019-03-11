import React, { Component } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
// import Debounce from 'lodash-decorators/debounce';
import Link from 'umi/link';
import styles from './index.less';
import { getStorage } from '../../services/utils';
import router from 'umi/router';

export default class GlobalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
        };
    }

    componentDidMount(){
        let userInfor = getStorage('userInfo') || {};
        // if(!userInfor.name){
        //     router.push('/user/login');
        // }
        this.setState({ currentUser: userInfor });
    }

    // 通知
    getNoticeData() {
        const { notices = [] } = this.props;
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }

    // 左侧收起点击事件
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    // @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    render() {
        const {
            collapsed,
            fetchingNotices,
            isMobile,
            logo,
            onNoticeVisibleChange,
            onMenuClick,
            signOutClick,
            onNoticeClear,
        } = this.props;
        const { currentUser } = this.state;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                {/* <Menu.Item disabled>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Divider /> */}
                <Menu.Item key="logout" onClick={() => signOutClick(/*currentUser && currentUser.userId || ''*/)}>
                    <Icon type="logout" />退出登录
                 </Menu.Item>
            </Menu>
        );
        const noticeData = this.getNoticeData();
        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    {/* <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon> */}
          <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                                <span className={styles.name}>{currentUser.userName}</span>
                            </span>
                        </Dropdown>
                    {/* {currentUser.userName ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar size="small" className={styles.avatar} src={currentUser.avatar || require('../../assets/head-img.png')} />
                                <span className={styles.name}>{currentUser.userName}</span>
                            </span>
                        </Dropdown>
                    ) : (
                            <Spin size="small" style={{ marginLeft: 8 }} />
                        )} */}
                </div>
            </div>
        );
    }
}
