import Mock from 'mockjs';
/* 登录 */
import { login } from './action/login.action';
/* 用户 */
import {
	userLoginDetailService,
	userListService,
	userDetailService,
	userAddService,
	userEditService,
	userDeleteService,
	userPasswordEditService,
	userEditLoginInfoService,
	userEditAvatarService
} from './action/user.action';
/* 权限 */
import { authorizeListService, authorizeAddService, authorizeEditService, authorizeDeleteService, authorizeDetailService } from './action/authorize.action';
/* 角色 */
import { roleListService, roleAddService, roleEditService, roleDeleteService, roleAuthorizeService, roleDetailService } from './action/role.action';
/* 菜单 */
import { menuListService, userMenuAuthorizeService, menuAddService, menuEditService, menuDeleteService, menuAuthorizeService, menuDetailService } from './action/menu.action';
/* 企业 */
import { companyListService, companyAddService, companyEditService, companyDetailService, companyRemoveService } from './action/company.action';
/* 部门 */
import { departmentListService, departmentAddService, departmentEditService, departmentDetailService, departmentDeleteService } from './action/department.action';
/* 公共 */
import { uploadImgService } from './data/common.data';

const baseUrl = 'http://www.huhulove.com/api/';
/* 用户 */
Mock.mock(`${baseUrl}user/login`, 'post', login);
Mock.mock(`${baseUrl}user/listUserAll`, 'post', userLoginDetailService);
Mock.mock(`${baseUrl}user/systemUserByIdAuthorizeQuery`, 'get', userMenuAuthorizeService);
Mock.mock(`${baseUrl}user/systemUserAllQuery`, 'post', userListService);
Mock.mock(RegExp(`${baseUrl}user/systemUserByIdQuery.*`), 'get', userDetailService);
Mock.mock(`${baseUrl}user/systemUserAdd`, 'post', userAddService);
Mock.mock(`${baseUrl}user/systemUserInfoUpdate`, 'post', userEditService);
Mock.mock(`${baseUrl}user/systemUserDel`, 'post', userDeleteService);
Mock.mock(`${baseUrl}user/systemUserPassUpdate`, 'post', userPasswordEditService);
Mock.mock(`${baseUrl}user/loginInfo`, 'post', userEditLoginInfoService);
Mock.mock(`${baseUrl}user/avatar`, 'post', userEditAvatarService);
/* 权限 */
Mock.mock(RegExp(`${baseUrl}authorize/authorizeAllQuery.*`), 'get', authorizeListService);
Mock.mock(`${baseUrl}authorize/authorizedd`, 'post', authorizeAddService);
Mock.mock(RegExp(`${baseUrl}authorize/authorizeUpdate.*`), 'post', authorizeEditService);
Mock.mock(`${baseUrl}authorize/authorizeDel`, 'post', authorizeDeleteService);
Mock.mock(RegExp(`${baseUrl}authorize/authorizeByIdQuery.*`), 'get', authorizeDetailService);
/* 角色 */
Mock.mock(`${baseUrl}role/roleAllQuery`, 'post', roleListService);
Mock.mock(`${baseUrl}role/roleAdd`, 'post', roleAddService);
Mock.mock(`${baseUrl}role/roleUpdate`, 'post', roleEditService);
Mock.mock(`${baseUrl}role/roleDel`, 'post', roleDeleteService);
Mock.mock(`${baseUrl}role/roleConfigure`, 'post', roleAuthorizeService);
Mock.mock(RegExp(`${baseUrl}role/roleByIdQuery.*`), 'get', roleDetailService);
/* 菜单 */
Mock.mock(`${baseUrl}menu/menuAllQuery`, 'get', menuListService);
Mock.mock(`${baseUrl}menu/menuAdd`, 'post', menuAddService);
Mock.mock(`${baseUrl}menu/menuInfoUpdate`, 'post', menuEditService);
Mock.mock(`${baseUrl}menu/menuDel`, 'post', menuDeleteService);
Mock.mock(`${baseUrl}menu/menuAuthorizeConfigure`, 'post', menuAuthorizeService);
Mock.mock(RegExp(`${baseUrl}menu/menuByIdQuery.*`), 'get', menuDetailService);
/* 部门 */
Mock.mock(`${baseUrl}department/departmentAllQuery`, 'post', departmentListService);
Mock.mock(`${baseUrl}department/departmentAdd`, 'post', departmentAddService);
Mock.mock(`${baseUrl}department/departmentUpdate`, 'post', departmentEditService);
Mock.mock(`${baseUrl}department/departmentDel`, 'post', departmentDeleteService);
Mock.mock(RegExp(`${baseUrl}department/departmentByIdQuery.*`), 'get', departmentDetailService);
/* 企业 */
Mock.mock(`${baseUrl}equipment/equipmentAllQuery`, 'post', companyListService);
Mock.mock(`${baseUrl}equipment/equipmentAdd`, 'post', companyAddService);
Mock.mock(`${baseUrl}equipment/equipmentInfoUpdate`, 'post', companyEditService);
Mock.mock(RegExp(`${baseUrl}equipment/equipmentByIdQuery.*`), 'get', companyDetailService);
Mock.mock(`${baseUrl}equipment/equipmentDel`, 'post', companyRemoveService);
/* 公共 */
Mock.mock(`${baseUrl}upload/img`, uploadImgService);
