<section class="hero-wrapper"><div></div></section>

<section class="container">
	<div class="content typography">
		<article class="sidenav-page">
			$Content
			$Form
		</article>

		<aside class="sidebar">
			<ul class="side-nav">
				<% loop $Menu(2) %>
				<li>
					<a href="$Link" class="$LinkingMode">$MenuTitle.XML</a>
					<% if $LinkOrSection = 'section' %>
						<% if $Children %>
						<ul>
							<% loop $Children %>
							<li><a href="$Link" class="$LinkingMode">$MenuTitle.XML</a></li>
							<% end_loop %>
						</ul>
						<% end_if %>
					<% end_if %>
				</li>
				<% end_loop %>
			</ul>

			<ul class="promo-boxes-2">
				<li class="promo-box">
					<a href="#">
						<figure>
							<img src="$ThemeDir/images/img.png" alt="img">
							<figcaption>SideMenu 1</figcaption>
						</figure>
					</a>
				</li>
				<li class="promo-box">
					<a href="#">
						<figure>
							<img src="$ThemeDir/images/img.png" alt="img">
							<figcaption>SideMenu 2</figcaption>
						</figure>
					</a>
				</li>
				<li class="promo-box">
					<a href="#">
						<figure>
							<img src="$ThemeDir/images/img.png" alt="img">
							<figcaption>SideMenu 3</figcaption>
						</figure>
					</a>
				</li>
				<li class="promo-box">
					<a href="#">
						<figure>
							<img src="$ThemeDir/images/img.png" alt="img">
							<figcaption>SideMenu 4</figcaption>
						</figure>
					</a>
				</li>
			</ul>
            <ul class="social-icons">
                <li><a class="social-facebook" href="">Facebook</a></li>
                <li><a class="social-twitter" href="">Twitter</a></li>
                <li><a class="social-youtube" href="">Youtube</a></li>
            </ul>
		</aside>
	</div>
</section>