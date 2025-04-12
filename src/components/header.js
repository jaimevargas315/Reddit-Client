import logo from './reddit-logo.svg';
import searchIcon from './search-icon.png'
import './header.css'

function Header({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    };


    return (
        <main id="headermain">
            <header>
                <div className="grid-container">
                    <div className="part1">
                        <img style={{ display: 'inline-block' }} id="logo" src={logo} alt="Reddit Logo"></img>
                    </div>
                    <div class="part2">
                        <h1 id="logoText">Reddit Lite</h1>

                    </div >
                    <div className="part3">
                        <input value={searchTerm} onChange={handleSearchChange} id="search" type="text" placeholder="Search posts..."></input>
                        <input id="search-icon" type="image" src={searchIcon} alt="search button"></input>
                        <p>{ }</p>
                    </div>

                </div>
            </header>
        </main>
    );
};

export default Header;