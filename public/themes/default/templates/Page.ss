<!doctype html>
<html lang="en">
    <head>
        <% base_tag %>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Silverstripe Default</title>
        $MetaTags(false)
    </head>

	<body>
		<% include Header %>

        <div id="content">
            $Layout
        </div>
		<% include Footer %>
	</body>
</html>
