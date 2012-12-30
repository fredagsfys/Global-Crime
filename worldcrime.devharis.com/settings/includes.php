<?php

function apache_get_modules()
{
        $modules = array(
                "core",
                "mpm_worker",
                "mod_http",
                "mod_so",
                "mod_auth_basic",
                "mod_auth_digest",
                "mod_authn_file",
                "mod_authn_alias",
                "mod_authn_anon",
                "mod_authn_dbm",
                "mod_authn_default",
                "mod_authz_host",
                "mod_authz_user",
                "mod_authz_owner",
                "mod_authz_groupfile",
                "mod_authz_dbm",
                "mod_authz_default",
                "mod_ldap",
                "mod_authnz_ldap",
                "mod_include",
                "mod_log_config",
                "mod_logio",
                "mod_env",
                "mod_ext_filter",
                "mod_mime_magic",
                "mod_expires",
                "mod_deflate",
                "mod_headers",
                "mod_usertrack",
                "mod_setenvif",
                "mod_mime",
                "mod_dav",
                "mod_status",
                "mod_autoindex",
                "mod_info",
                "mod_dav_fs",
                "mod_vhost_alias",
                "mod_negotiation",
                "mod_dir",
                "mod_actions",
                "mod_speling",
                "mod_userdir",
                "mod_alias",
                "mod_rewrite",
                "mod_proxy",
                "mod_proxy_balancer",
                "mod_proxy_ftp",
                "mod_proxy_http",
                "mod_proxy_connect",
                "mod_cache",
                "mod_suexec",
                "mod_disk_cache",
                "mod_file_cache",
                "mod_mem_cache",
                "mod_cgi",
                "mod_version",
                "mod_fcgid",
                "mod_hostinglimits",
		"mod_h264_streaming",
		"mod_pagespeed",
                "mod_proxy_ajp");

        return $modules;
}
if($_SERVER['HTTP_HTTPS'] == "on"){
        $_SERVER['HTTPS'] = "on";
	$_SERVER['HTTPS'] = $_SERVER['HTTP_HTTPS'];
	$_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_REMOTE_ADDR'];
}
?>
