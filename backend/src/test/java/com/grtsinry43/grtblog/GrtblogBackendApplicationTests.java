package com.grtsinry43.grtblog;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.grtsinry43.grtblog.util.ArticleParser;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class GrtblogBackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    public void testGenerateToc() throws JsonProcessingException {
        String content = "在 22 年刚创建个人主页的时候，由于我的技术水平不够，只能用一些 wordpress typecho 这种直观的工具，后来因为换域名等等一系列的问题就被搁置了...再后来为了过备案，用图形化工具和 bootstrap 糊了一个，而如今熟练掌握 Vue 和 React 等框架之后，也到了完全重写的时候了，于是就有了这段记录。\n" +
                "\n" +
                "<!--more-->\n" +
                "\n" +
                "关键词：Vue SSR，Nuxt.js\n" +
                "\n" +
                "> 网页的开发一直在持续哇...本文章会持续跟进更新\n" +
                "\n" +
                "最后链接：https://www.grtsinry43.com/\n" +
                "\n" +
                "## 框架选择\n" +
                "\n" +
                "首先，对于这种主页类的网站，单纯的 Vue React SPA（单页面应用）肯定是不行的，比如说这里我们使用 pure-admin 模板创建的一个后台系统（Vue3），对于搜索引擎来说不会等待页面完全加载和渲染，而抓到的这些内容无法分析网站的关键词和主题等，导致很难被搜索引擎排名考前，因此我们不得不从历史中汲取经验，从服务端生成静态网页，到了客户端渲染的单页面应用，又回到了服务端渲染\n" +
                "\n" +
                "![这样是很难做好 SEO 的](https://dogeoss.grtsinry43.com/2024/08/screenshot_20240830_183309.png)\n" +
                "\n" +
                "对于个人主页这种比较小的项目，我更喜欢使用 Vue 来完成开发，也就是其对应的 SSR 框架——Nuxt.js\n" +
                "\n" +
                "## 快速上手\n" +
                "\n" +
                "由于要使用 `NuxtUI`，我们便可以使用官方的创建工程的脚手架\n" +
                "\n" +
                "```bash\n" +
                "npx nuxi@latest init -t ui [项目名称]\n" +
                "```\n" +
                "\n" +
                "创建好项目之后，我们便可以像正常写 Vue 一样来进行开发啦\n" +
                "\n" +
                "### 前置准备工作\n" +
                "\n" +
                "在代码块以及项目名称中，我们选用一个等宽而且适用于代码的字体 `JetBrains Mono`，于是我们可以在 `assets/fonts.css` 中这样进行引入\n" +
                "\n" +
                "```css\n" +
                "@font-face {\n" +
                "    font-family: 'JetBrains Mono';\n" +
                "    src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Medium.woff2') format('woff2');\n" +
                "    font-weight: 500;\n" +
                "    font-style: normal;\n" +
                "}\n" +
                "\n" +
                ".font-jb-mono {\n" +
                "    /* 设置fallback防止出现宋体 */\n" +
                "    font-family: 'JetBrains Mono', 'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Console', 'Microsoft YaHei', 'WenQuanYi Micro Hei', monospace;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "注意这里要设置好 fallback 字体，因为某些 Windows 系统（雾）默认会回落到宋体，导致中文字体不堪入目\n" +
                "\n" +
                "以后当我们需要使用的时候只需要挂上这个类名就好\n" +
                "\n" +
                "### 防止掉头发\n" +
                "\n" +
                "经典防止掉头发几件套：`assets/global.css`\n" +
                "\n" +
                "```css\n" +
                "* {\n" +
                "    margin: 0;\n" +
                "    padding: 0;\n" +
                "    box-sizing: border-box;\n" +
                "}\n" +
                "\n" +
                "a {\n" +
                "    text-decoration: none;\n" +
                "    color: inherit;\n" +
                "}\n" +
                "\n" +
                "ul {\n" +
                "    list-style: none;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "## 疑难解决方案与创新点\n" +
                "\n" +
                "### 桌面与移动端导航栏适配\n" +
                "\n" +
                "为了达到最完美的使用效果，我直接写了 `NavBar` 和 `NavBarMobile` 两个组件，通过简单的媒体查询来进行切换\n" +
                "\n" +
                "```css\n" +
                "@media (max-width: 800px) {\n" +
                "  .nav-bar-desktop {\n" +
                "    display: none;\n" +
                "  }\n" +
                "\n" +
                "  .nav-bar-mobile {\n" +
                "    display: block;\n" +
                "  }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "对于移动段的 Navbar，我选择了可收起菜单来优化体验\n" +
                "\n" +
                "```html\n" +
                "const toggleMenu = () => {\n" +
                "  isMenuOpen.value = !isMenuOpen.value\n" +
                "}\n" +
                "\n" +
                "const toggleLocale = () => {\n" +
                "  locale.value = locale.value === 'en' ? 'zh' : 'en';\n" +
                "};\n" +
                "</script>\n" +
                "\n" +
                "<template>\n" +
                "  <div\n" +
                "      class=\"nav-container fixed w-full bg-opacity-80 bg-blue-50 text-blue-950 dark:bg-opacity-80 dark:bg-black dark:text-white\">\n" +
                "    <UContainer class=\"flex flex-row items-center justify-between nav-inner\">\n" +
                "      <div class=\"nav-logo\">\n" +
                "        <NuxtLink :to=\"localePath('/')\" class=\"font-bold\">{{ $t('homePageTitle') }}</NuxtLink>\n" +
                "      </div>\n" +
                "      <!-- Toggle Button for Mobile Menu -->\n" +
                "      <UButton class=\"lg:hidden bg-opacity-0 dark:bg-opacity-0\" @click=\"toggleMenu\"\n" +
                "               icon=\"i-heroicons:bars-3-bottom-right\"\n" +
                "               square\n" +
                "               color=\"gray\"\n" +
                "      >\n" +
                "      </UButton>\n" +
                "      <!-- Theme Toggle Button -->\n" +
                "      <div class=\"theme-option lg:block\">\n" +
                "        <UToggle\n" +
                "            on-icon=\"i-heroicons-moon-20-solid\"\n" +
                "            off-icon=\"i-heroicons-sun-20-solid\"\n" +
                "            :model-value=\"colorMode.preference === 'dark'\"\n" +
                "            @change=\"toggleTheme\"\n" +
                "        />\n" +
                "      </div>\n" +
                "      <!-- Icons Container -->\n" +
                "      <div class=\"actions-container hidden lg:grid\">\n" +
                "        <Icon class=\"language-toggle-icon hover:text-blue-400 dark:hover:text-blue-600\" name=\"i-heroicons-language\" @click=\"toggleLocale\"/>\n" +
                "        <Icon class=\"rss-icon hover:text-blue-400 dark:hover:text-blue-600\" name=\"i-heroicons-rss\"/>\n" +
                "        <a href=\"https://github.com/grtsinry43/home-web\" target=\"_blank\">\n" +
                "          <Icon class=\"github-icon hover:text-blue-400 dark:hover:text-blue-600\" name=\"i-grommet-icons:github\"/>\n" +
                "        </a>\n" +
                "      </div>\n" +
                "    </UContainer>\n" +
                "\n" +
                "    <!-- Mobile Navigation Menu -->\n" +
                "    <div v-show=\"isMenuOpen\"\n" +
                "         class=\"nav-extend-container flex flex-col items-center bg-blue-50 bg-opacity-85 dark:bg-black dark:bg-opacity-80 backdrop-blur-lg\">\n" +
                "      这里就是菜单项目啦\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</template>\n" +
                "```\n" +
                "\n" +
                "###  深浅色模式的极不优雅解决方案\n" +
                "\n" +
                "```js\n" +
                "import {onMounted} from \"vue\";\n" +
                "const colorMode = useColorMode();\n" +
                "\n" +
                "const toggleTheme = () => {\n" +
                "  if (colorMode.preference === 'system') {\n" +
                "    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';\n" +
                "    buttonState.value = colorMode.preference === 'dark';\n" +
                "  } else {\n" +
                "    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';\n" +
                "    buttonState.value = colorMode.preference === 'dark';\n" +
                "  }\n" +
                "};\n" +
                "\n" +
                "const buttonState = ref(false);\n" +
                "\n" +
                "onMounted(() => {\n" +
                "  // 根据最开始的主题设置按钮的图标\n" +
                "  buttonState.value = colorMode.value === 'dark';\n" +
                "})\n" +
                "```\n" +
                "\n" +
                "这里深色模式的实现有点太不优雅了，我发现 NuxtUI 官网确实有一个跟随主题的开关，但是自己实现起来就是很奇怪，对于输出的 `colorMode` 有两个用的上的属性，一个是 `preference` 对应偏好主题（light dark system），一个是 `value` 对应当前主题（light dark），由于偏好能被保存下来，于是选择在切换按钮时改变 `preference` 的对应的值\n" +
                "\n" +
                "当组件被挂载（onMounted），首先根据 value 设置初始的状态，当点击切换时，对于当前是否偏好系统要采取不同的方式来切换，不知道大佬们有没有什么好办法，或者过几天我再看看 Nuxt 源码";
        String actualToc = ArticleParser.generateToc(content);
        System.out.println(actualToc);
    }

//    @Test
//    public void testGenerateTocWithChinese() throws JsonProcessingException {
//        String content = "在这段时间里我通过完成多个项目，深入学习了前端和全栈开发的技术。主要使用了 Vue3、C++ Web 框架、jwt 鉴权、Docker、Nginx、FastAPI、微信网页开发、Vue2、Vant 组件库、TypeScript 和 React 等技术。\n" +
//                "\n" +
//                "项目驱动对我来说是一种很好的学习方式哈哈哈，不仅让我掌握了新技术，也让我遇到并克服了许多挑战，比如阅读别人的代码、复杂的后端逻辑处理和微信开发的复杂性等。  通过项目驱动的学习方式，我快速提升了自己的技术能力，并对此感到非常满意和自豪。我也意识到自己还处于学习的初阶段，对未来的学习充满了规划和期待。\n" +
//                "\n" +
//                "<!--more-->\n" +
//                "\n" +
//                "## 额..最近的事情\n" +
//                "\n" +
//                "上次总结应该是 5 月 27 号，那大概两周的时间学习 Vue 剩下的内容，那个时候同时也在研究全栈开发，照葫芦画瓢弄明白了 Spring Boot（不过基础太差，这个假期还得再弄一弄），然后应该是六月初。\n" +
//                "\n" +
//                "后来搞了一周的课设、期末的任务、一些慕课的考试什么的，六月下旬就进期末考试周了，全天都在 ~~预习~~ 啊不，复习。主要也是老师讲了一学期也未必能给我们讲明白，就是老师其实很厉害但是讲课方面可能就不会那么面面俱到，反正我就一学期的内容看英文教材一周弄完了，考试结束换完寝室是六月末。\n" +
//                "\n" +
//                "然后痛苦的来了，就是我所在的校团委网络信息部有个学生组织的技术部门，这学期当部长的几个学长下学期都不打算继续干了，一般都选择保研了。~~像我这种会学习不会考试绩点很低的肯定以提升技术为主~~ 然后下学期我就得当两个部门的部长，假期要搞的几个项目都到我身上了 \uD83D\uDE30，和我同级的同学们前端后端又没那么熟练，所以本质上整个两个项目全是我一个人写的 \uD83D\uDE2D。ddl 是 10 号，所以我被迫留在长沙现在还没有离校，9 号弄完上线的，现在终于轻松了。\n" +
//                "\n" +
//                "## 最近的学习总结\n" +
//                "\n" +
//                "感觉最近的前端学习全是自主探索的，全是项目驱动的 \uD83D\uDE02。\n" +
//                "\n" +
//                "### 先是课程设计\n" +
//                "\n" +
//                "课设是 C++的，正好我之前研究过一个 C++的 Web 框架，就给弄成前后端了。当时就是把这个当成练手项目了，因为全栈项目没搞过几个，所以就直接用上了 Vite+Vue3，至于学的话就是自己看文档，自己研究，然后也没用 Vuex 用的 pinia，同样也是自己研究的 \uD83D\uDE02。为了把这个项目搞出来又学了 jwt 让前后端能鉴权。\n" +
//                "\n" +
//                "最后成品太丑了....搞个 Element Plus 其实主要是为了应付嘛（doge），学习技术和练手才是真，~~绩点我又不在乎~~\n" +
//                "\n" +
//                "后来又自己研究了 docker 环境，nginx 反代后端到 `/api`，总之就是让我学到相当相当多，算是一个对我挺有意义的项目了\n" +
//                "\n" +
//                "![image-20240711222156417](https://dogeoss.grtsinry43.com/2024/07/image-20240711222156417.png)\n" +
//                "\n" +
//                "###  之后是接的学校的项目\n" +
//                "\n" +
//                "额这个对我来说主要的难度一个是微信网页开发实在太恶心，要搞什么认证又登录，还有就是学长传承下来了代码，但是这个代码的质量 emm...~~就是说屎山代码应该不过分~~。因为项目后端用的 FastAPI，这样我又不得不去学习这个，两天之内看文档学完了，但是真正上手看学长代码我才知道问题严重性。\n" +
//                "\n" +
//                "<img src=\"https://dogeoss.grtsinry43.com/2024/07/154709B18B51FEF491EC9F8469FC1364.png\" alt=\"154709B18B51FEF491EC9F8469FC1364\" style=\"zoom:25%;\" />\n" +
//                "\n" +
//                "第一个项目是一个什么社团注册，这个前端之前代码用 Vue2 写的，不过还好代码完全没有压力，这个 Vant 组件库我又跑去看文档了，不过后端代码有点太抽象了，又用刚学的知识改了半天后端。然后还有...还有团委老师经常让我加功能 \uD83D\uDE30 啊这个太痛苦了，因为学长代码用的数据结构有点过于离谱，好多都是曲线救国，真的极其痛苦。\n" +
//                "\n" +
//                "<div style=\"display:flex;\">\n" +
//                "<img src=\"https://dogeoss.grtsinry43.com/2024/07/FD42D5950E45510DF7AA62EB5EEA4C04.png\" alt=\"FD42D5950E45510DF7AA62EB5EEA4C04\" style=\"width:30%;\" />\n" +
//                "<img src=\"https://dogeoss.grtsinry43.com/2024/07/4A88CD8706AB2D582D9EDDD96243D836.png\" alt=\"4A88CD8706AB2D582D9EDDD96243D836\" style=\"width:30%;\" />\n" +
//                "<img src=\"https://dogeoss.grtsinry43.com/2024/07/B28977AB2B6D607D38D53945572D36B4.png\" alt=\"B28977AB2B6D607D38D53945572D36B4\" style=\"width:30%;\" />\n" +
//                "</div>\n" +
//                "\n" +
//                "\n" +
//                "\n" +
//                "第二个就是一个简单的签到打卡，这个是被微信恶心的网页开发卡了好久，就是有个 `wx.config()` 需要后端调用 api 缓存 token 和签名啥的一大堆弄的天天做梦都在改 Bug\uD83D\uDE30，连着 3 天才弄出来。其他的就简单了感觉就是体力活了哈哈哈，实际写业务逻辑挺快的，不过好多后端给的响应数据结构太奇怪了，连写这个还得连改后端。然后为了管理又搞了个后台系统：\n" +
//                "\n" +
//                "![image-20240711225210198](https://dogeoss.grtsinry43.com/2024/07/image-20240711225210198.png)\n" +
//                "\n" +
//                "![image-20240711225506531](https://dogeoss.grtsinry43.com/2024/07/image-20240711225506531.png)\n" +
//                "\n" +
//                "这个就是用 `pure-admin` 二次开发的，因为之前用过 `element-admin` 那个感觉这个还挺简单的，然后因为这个系统用的 TypeScript，大体上和 js 差不多吧，不过还是被迫，不对是自愿哈哈哈哈，毕竟能学到好多东西，看了文档搞明白了。\n" +
//                "\n" +
//                "###  研究学长的项目\n" +
//                "\n" +
//                "![image-20240711230010314](https://dogeoss.grtsinry43.com/2024/07/image-20240711230010314.png)\n" +
//                "\n" +
//                "这个是一个学长写的项目，不是我写的，不过我太感兴趣了 \uD83D\uDE02，所以自己看文档一天之内过了一遍 React，然后给学长提了 pr，现在还挺好看的\n" +
//                "\n" +
//                "## 简要总结\n" +
//                "\n" +
//                "这段时间真的都是因为一堆项目学到了好多东西，还挺爽的哈哈，至少因为项目需要自学了 Vue3，啊对还有 node 学着写了中间层，还有学了 React 和学长一起弄项目搞项目去了。\n" +
//                "\n" +
//                "接下来计划再学习 node 中间层和后端，然后继续慢慢向下学习。而且就是我一年之内从刚开始写简单的 Hello World，到熟悉静态网页，再到今天一个人搞全栈项目，真的有非常大的进步，也真的克服了好多好多困难才能做到。不过我也知道我这才是刚入门而已，前面要学的太多太多了\n" +
//                "\n" +
//                "然后假期回家也是绝大部分时间写代码，继续加油叭！";
//        String expectedToc = "[{\"level\": 2, \"text\": \"额..最近的事情\", \"anchor\": \"额..最近的事情\"}, {\"level\": 2, \"text\": \"最近的学习总结\", \"anchor\": \"最近的学习总结\"}, {\"level\": 3, \"text\": \"先是课程设计\", \"anchor\": \"先是课程设计\"}, {\"level\": 3, \"text\": \"之后是接的学校的项目\", \"anchor\": \"之后是接的学校的项目\"}, {\"level\": 3, \"text\": \"研究学长的项目\", \"anchor\": \"研究学长的项目\"}, {\"level\": 2, \"text\": \"简要总结\", \"anchor\": \"简要总结\"}]";
//
//        String actualToc = ArticleParser.generateToc(content);
//
//        assertEquals(expectedToc, actualToc);
//    }

}
