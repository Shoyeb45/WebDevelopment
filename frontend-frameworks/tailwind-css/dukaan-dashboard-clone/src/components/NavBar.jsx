

export function NavBar({ imgLink, name, navLinks, credits }) {
  return (
    <nav className="bg-[#1E2640] text-white flex flex-col gap-3.5 p-2 h-[100vh]">
      <NavTop name={name} imgLink={imgLink}></NavTop>
      <NavLinks navLinks={navLinks}></NavLinks>
      <NavFooter credits={credits}/>
    </nav>
  );
}

function NavTop({ imgLink, name}) {
  return (
    <div className="flex justify-between items-center gap-14 p-2 ">

      <div className="flex gap-2.5">
        <img src={imgLink} alt="profile-image" className="rounded-xl"/>
        
        <div>
          <div className="font-medium">{name}</div>
          <div className="font-light text-[#D1D3D9]">
            <a href="#">
              <u>Visit Store</u>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-around items-center">
        <i className="bi bi-chevron-down text-2xl font-bold"></i>
      </div>
    </div>
  );
}

function NavLinks({ navLinks }) {
  return (
    <ul className="flex flex-col items-start ">
        {navLinks.map((navLink) => {
            return (
                <Link key={navLink.id} title={navLink.title} iconName={navLink.iconName} />
            )
        })}
    </ul>
  );
}

function Link({ iconName, title }) {
    return (
        <li className="flex p-1.5 hover:bg-[#FFFFFF]/10 w-full">
            <i className={`bi bi-${iconName} ms-2.5 me-2.5 text-xl`}></i>
            <a href="#" className="p-1 font-medium">
                { title }
            </a>
        </li>
    )
}


function NavFooter({ credits }) {
  return (
    <div className="flex bg-[#353C53]  p-2 gap-4 mt-28 rounded">
      <div className="p-3 bg-[#FFFFFF]/10 rounded">
        <i className="bi bi-wallet text-xl"  ></i>
      </div>
      <div className="flex flex-col justify-between">
        <div className="font-light">Available Credits</div>
        <div className="font-medium">{credits.toFixed(2)}</div>
      </div>
    </div>
  )
}