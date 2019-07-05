import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                {props.destination}
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Barcelona
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Madrid
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Milano
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="#">
                Athens
            </a>
        </Menu.Item>
    </Menu>
);
const Dropmenu = () => (
    <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
            Hover me <Icon type="down" />
        </a>
    </Dropdown>
);

export default Dropmenu;
