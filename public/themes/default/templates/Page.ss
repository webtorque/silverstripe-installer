<!DOCTYPE html>
<html>
<head>
    <% base_tag %>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    $MetaTags(0)

    <title><% if MetaTitle %>$MetaTitle<% else %>$Title &raquo; $SiteConfig.Title<% end_if %></title>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet">
    <script src="https://use.typekit.net/zun2exx.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
    <%--<link rel="shortcut icon" type="image/x-icon" href="/themes/silverfernfarms/images/favicon.ico"/>--%>

    <% require themedCSS(typography) %>
    <% require themedCSS(main) %>
    <% require themedCSS('print', '', 'print') %>

    <% require javascript("themes/cm/build/site.js") %>

</head>

<body class="{$URLSegment}">

<% if not $HideHeader %>
    <% if $UseGlobalHeader %>
        $SiteConfig.DefaultHeaderModule
    <% end_if %>
<% end_if %>

<div id="mainContainer" class="$PageTypeStyle<% if $UseSmallButtons == 1 %> sm-buttons<% end_if %>"
     <% if $BackgroundImage %>style="background-image:url('$BackgroundImage.URL');"<% end_if %>>

    $Layout

    <% include SideMenu %>
</div>

<% if not $HideFooter %>
    <% if $UseGlobalHeader %>
        $SiteConfig.DefaultFooterModule
    <% end_if %>
<% end_if %>

<noscript>
    <div class="no-script-message site-message">
        <p><%t Site.NoJavascript 'This site requires javascript. Please enable javascript to view the site.' %></p>
    </div>
</noscript>
<div class="unsupported-browser-message site-message">
    <a href="#" class="close">X</a>
    <p><%t Site.UnsupportedBrowser 'Sorry, you are using an unsupported browser. Please upgrade to the latest version.' %></p>
</div>
</body>

</html>