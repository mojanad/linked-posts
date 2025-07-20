import {
  Navbar,
  NavbarBrand,
  TextInput
} from "flowbite-react";
import { Aave } from "iconsax-reactjs";
import { Link } from "react-router";

export default function AppNavbar() {
  return (
    <Navbar   rounded>
    <div className="flex justify-between items-center gap-2 sm:gap-12 w-full">
        <NavbarBrand as={Link} href="https://flowbite-react.com">
          <Aave size="32" color="#FF8A65" />
        </NavbarBrand>
        <TextInput
          id="search"
          type="search"
          placeholder="Search"
          shadow
          className="grow"
          size="sm"
        />
    </div>
      {/* <NavbarToggle /> */}
      {/* <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse> */}
    </Navbar>
  );
}
