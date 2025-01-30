export enum BlockCategory {
  WidgetBlock = "Elements",
}

export const WIDGET_BLOCK = [
  {
    id: "Text",
    label: "Text",
    media: `https://editor.mailstyler.com/static/assets//img/elements/emc_text.svg`,
    activate: true,
    content: `<div id="block" style="position: relative; min-height: 20vh;">
      <table style="width:100%;margin:0 auto 0 auto; min-height: 20vh;" cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
        <tbody>
          <tr>
            <th style="padding-top: 0px;padding-right:0;padding-bottom:0;padding-left:0;">
              <table style="width:600px;margin:0 auto; min-height: 20vh;" cellspacing="0" cellpadding="0" width="600" align="center" border="0">
                <tbody>
                  <tr>
                    <th style="width:600px;text-align:center;" width="600" align="center">
                      <table style="width:100%; min-height: 20vh;" cellspacing="0" cellpadding="0" align="center"  width="100%">
                        <tbody>
                          <tr>
                            <th style="width: 600px; word-break: break-word; background-color: rgb(255, 255, 255); vertical-align: top; text-align: left; font-weight: normal; padding: 0px;" bgcolor="#ffffff" width="600" valign="top" align="left" class="contenttd rtdrop w600 enable_column "  ><div>Add Content</div></th></tr></tbody></table>
                    </th>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>
        </tbody>
      </table>
    </div>`,
  },
  {
    id: "Title",
    label: "Title",
    media: `https://editor.mailstyler.com/static/assets//img/elements/emc_title.svg`,
    activate: true,
    content: `<h1 class="heading">Insert title here</h1>`,
  },
  {
    id: "Link",
    label: "Link",
    media: `https://editor.mailstyler.com/static/assets//img/elements/emc_canspam.svg`,
    activate: true,
    content: `<a href="#" class="text-blue-500 hover:text-blue-700 underline">Double click to change Link text and URL</a>`,
  },
  {
    id: "Social Media",
    label: "Social Media",
    media: `https://editor.mailstyler.com/static/assets//img/elements/emc_social.png`,
    content: `<div id="social-container" class="container max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-4">Follow Us</h1>
  <div id="social-media" class="social-media flex justify-center space-x-4 mt-4">
  
  <a id="Facebook" href="https://facebook.com" class="text-gray-500 hover:text-blue-500">
     <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/D69054AE-D0E2-A193-2D42-DA40921490E5_1550738495_facebook.png" height="32" width="32" />
  </a>
  <a id="X" href="https://twitter.com" class="text-gray-500 hover:text-blue-400">
    <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/3752D04D-42ED-401F-39D0-30EFE18FBDC1_1550738573_twitter.png height="32" width="32" />
  </a>
  <a id="Linkedin" href="https://linkedin.com" class="text-gray-500 hover:text-blue-700">
    <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/13436FCA-4C90-0586-7C56-8260A0BA034B_1550738594_linkedin.png" height="32" width="32" />
  </a>
  <a id="Instagram" href="https://instagram.com" class="text-gray-500 hover:text-pink-500">
    <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/92184B61-C325-FFAC-E092-2D9EAA16C22E_1550738861_instagram.png height="32" width="32" />
  </a>
  <a id="Youtube" href="https://instagram.com" class="text-gray-500 hover:text-pink-500">
    <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/5260656E-72C8-349E-B195-9E794C8FB0A0_1550738551_youtube.png" height="32" width="32" />
  </a>
  <a id="Website" href="https://instagram.com" class="text-gray-500 hover:text-pink-500">
    <img style="display:block;border:0;height:32px;outline:none;text-decoration:none;width:32px;" alt="" src="https://mailchef.s3.amazonaws.com/uploads/development/785463/image/18BFAE5B-DE53-30CC-57F5-2AFDC461BF97_1550738839_global.png" height="32" width="32" />
  </a>
   
  </div>
</div>`,
  },
  {
    id: "header",
    label: "Header",
    content: `
     

<nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
        </li>
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
            <!-- Dropdown menu -->
            <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                </ul>
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
            </div>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    `,
  },
];
