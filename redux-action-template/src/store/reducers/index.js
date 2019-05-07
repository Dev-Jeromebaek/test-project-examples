import { combineReducers } from 'redux';

import adGroup from 'shared/store/modules/adGroup';
import campaign from 'shared/store/modules/campaign';
import filter from 'shared/store/modules/filter';
import nav from 'shared/store/modules/nav';
import main from './main';
import ui from './ui';
import test from './test';

export default combineReducers({ adGroup, campaign, filter, nav, main, ui, test });
