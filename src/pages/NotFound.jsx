import React from 'react'
import "./notfound.css"
const NotFound = () => {
  return (
    <div className="grid gap-3 pt-27 sm:pt-40 bg-[#FFFFF0] justify-center">
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
</div>
<h1 className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold mb-2.5 text-center">404 not found go to : </h1>
<strong className="text-[#b9900d] font-['Maghfirea',sans-serif] tracking-[2px] text-3xl font-semibold text-center"><a href="https://www.aliyanizarstudio.com">Home Page</a></strong>
</div>
  )
}

export default NotFound
