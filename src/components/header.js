import logo from './reddit-logo.svg';
import searchIcon from './search-icon.png'
import './header.css'

 function Header(){
    return (
        <main>
            <header>
                <grid class="grid-container">
                    <div class="part1">
                        <img style={{ display: 'inline-block' }} id="logo" src={logo} alt="Reddit Logo"></img>
                    </div>
                    <div class="part2">
                        <h1 id="logoText">Reddit Simplified</h1>

                    </div >
                    <div class="part3">
                        <input id="search" type="text" placeholder="Search Reddit..."></input>
                        <input id="search-icon" type="image" src={searchIcon} alt="search button"></input>
                        <p>{ }</p>
                    </div>

                </grid>
            </header>
        </main>
    );
};

export default Header;