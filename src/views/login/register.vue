<template>
    <div class="regist-container-new">
        <div v-show="dialogModal"
            style="width:100%;height:100%;background:rgba(0,0,0,0.5);position:fixed;z-index:1000;top:0px">
            <div style="margin:300px auto;text-align:center">
                <span class="el-icon-loading" style="color:#fff;font-size:36px"></span>
            </div>
        </div>
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="regist-form" auto-complete="on">
            <el-card style="width: 400px;border:0px solid #fff" shadow="never">
                <div slot="header" class="clearfix" style="background:#323A47;">
                    <div class="menu-logo">
                        <img src="@/assets/img/logo.png" alt="logo" class="logo2">
                    </div>
                </div>

                <el-row v-if="registerForm.regType==1">
                    <el-form-item label="邮箱" prop="email"
                        :rules="[{required: true, trigger: 'blur', message:'邮箱不能为空'}, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } ]">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱" type="email" auto-complete="off" />
                    </el-form-item>
                </el-row>
                <el-row id="registerForm_sel_area" v-if="registerForm.regType==2" class="phoneRegister">
                    <el-form-item label="手机号码" prop="phone"
                        :rules="[{required: true,validator: checkPhone, trigger: ['blur', 'change'] }]">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号码" type="text" auto-complete="on">
                            <el-select v-model="registerForm.area_code" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in areaCodeList" :key="index" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="验证码" prop="check_verify_code">
                        <el-col>
                            <el-input v-model="registerForm.check_verify_code" placeholder="请输入验证码" type="text"
                                auto-complete="off">
                                <template slot="append">
                                    <el-button v-if="timeBtn"
                                        style="width:120px;background:rgba(0,0,0,0.5);padding: 10px 20px;color:#fff">
                                        {{time+' s'}}</el-button>
                                    <el-button v-else type="primary" :loading="sendBtnLoad" :disabled="sendBtnLoad"
                                        @click="checkVerifyFunc"
                                        style="width:120px;padding: 10px 10px;background: #323A47;color: #fff;">
                                        {{sendBtnLoad?'':'发送验证码'}}</el-button>
                                </template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="设置密码" prop="password">
                        <el-input v-model="registerForm.password" :type="passwordType" placeholder="请输入密码且长度不小于6位"
                            auto-complete="new-password" />
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item label="确认密码" prop="ConfirmPassword">
                        <el-input v-model="registerForm.ConfirmPassword" :type="passwordType" placeholder="请再次输入密码"
                            auto-complete="new-password" />
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item prop="accept">
                        <el-checkbox v-model="registerForm.accept"><span style="color: #606266;">我接受</span>
                        </el-checkbox>
                        <el-link type="primary" @click="dialogClause=true;dialogType='1'">服务条款</el-link> 和 <el-link
                            type="primary" @click="dialogClause=true;dialogType='2'">私隐政策</el-link>
                    </el-form-item>
                </el-row>

                <el-row style="margin: 0 -20px;">
                    <el-button :loading="loading"
                        style="width:100%;margin-bottom:10px;margin-top:15px;background: #323A47;color: #fff;border-radius: 3px;"
                        @click.native.prevent="submitregister('registerForm')">
                        注册
                    </el-button>
                </el-row>

                <el-row>
                    <el-button v-if="registerForm.regType==2" style="float: left;" @click="registerType(1)" type="text">
                        使用邮箱注册
                    </el-button>
                    <el-button v-if="registerForm.regType==1" style="float: left;" @click="registerType(2)" type="text">
                        使用手机号码注册
                    </el-button>
                    <span style="height: 34px;line-height: 34px;text-align: right;float: right;">已有账号？<el-button
                            @click="loginPage" style="padding: 9px 0 9px 3px;" type="text">立即登录</el-button></span>

                </el-row>
            </el-card>
        </el-form>

        <el-dialog :title="dialogType=='1'?'服务条款':'隐私政策'" class="dialogClause" :close-on-click-modal="false" 
            :visible.sync="dialogClause ">
            <div v-if="dialogType=='1'"
                class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-12 col-md-offset-0">
                <div class="box-register" style="margin: 15px; top: 0px; display: block;">
                    <section>
                        <div id="main-bg">
                            <div class="pri-box clear-fix">
                                <p>下列说明的服务条款 (下称"条款") 适用于您对盈先系统 http://www.ebixsystem.com (下称"ebixSYSTEM") 服务的使用，请小心阅读:
                                </p>
                                <dl class="dl1">
                                    <dt>同意接受条款</dt>
                                    <dd>ebixSYSTEM依照以下的条款提供服务给您，本公司可随时修改该条款，不另行通知也无需对您负上任何责任。如您在修订条款后继续使用该服务，即表明同意接受已修订的条款。如您不同意相关变更，必须停止使用服务。因此，您应随时查阅网站内最新版的条款。此外，当使用ebixSYSTEM的升级服务
                                        (如商务网站及其他增值系统模块等) 您同意接受其额外的条款。如有任何抵触，则以该升级服务之条款为准。</dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>服务说明</dt>
                                    <dd>ebixSYSTEM现时通过国际互联网络为您提供工具和服务(下称"服务")。本服务只提供于具有法律约束力的商业机构，如您不符合本项条件，请勿使用本服务。ebixSYSTEM可以基于其自行之决定拒绝向任何人提供服务。为使用本服务，您应自行配备国际互联网络连结所需的一切必要装备，并自行负担所使用的连接费及一切相关服务费用。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>注册资格及义务</dt>
                                    <dd>ebixSYSTEM可不提出任何理由而拒绝任何使用本服务的注册。您必需符合以下资格才可注册及使用本服务:</dd>
                                    <ul>
                                        <li> 必须是当地合法的注册公司(在有须要的时候，ebixSYSTEM有权要求您提供合法的注册証明。</li>
                                        <li> 同意接受ebixSYSTEM的服务条款。当您提出注册即接受条款； </li>
                                        <li> 已采取一切行动并履行本条款的必要授权； </li>
                                        <li> 您在注册申请表格提供的公司登记资料属实、正确、最新及完整； </li>
                                        <li> 您会维持并立即更新登记资料，确保其为属实、正确、最新及完整； </li>
                                        <li> 您符合注册合法会员资格的条款。如有违规，ebixSYSTEM有权在给予或不给予通知的情况下取消您的会员资格。 </li>
                                    </ul>
                                </dl>

                                <dl class="dl1">
                                    <dt>会员登入名、密码及安全</dt>
                                    <dd>当您完成本服务的注册程式后，会收到一个会员登入名和密码。您须负责为您的会员登入名及密码保密并防止任何未经授权的使用。所有利用该会员登入名及密码所进行的一切行动，您需负上完全的责任。如您的会员登入名或密码遭到未获授权的使用，或者其他任何安全问题发生时，您将立即通知ebixSYSTEM。您未能遵守本项规定所衍生之任何损失或损害，ebixSYSTEM不予负责。如果您连续90天内没有以会员身份登录ebixSYSTEM网站，您的会员资格会被取消。而您在ebixSYSTEM发布的内容如公司资料、产品资料、采购资讯等将会同时被封存及保存一年。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>使用者责任</dt>
                                    <dd>您了解一切的内容包括资料、文字、软件、音乐、照片、图形、视频、资讯或其他资料，无论其为公开粘贴或私下传送，均为内容提供者之责任。这表示您将对经由本服务上载、粘贴、发送的电子邮件或传送之内容负完全的责任。您同意只将本服务作业务用途，并不会将会员资格出售或转送给其他人。您在ebixSYSTEM发布的内容均符合并适用于其对使用者发布的内容要求，您同意ebixSYSTEM是基于其自行之决定，在通知或未通知之情形下更改、删除或隐藏任何不符合要求的内容。
                                    </dd>
                                    <dd>在使用本服务时您需同意以下几点：</dd>
                                    <ul>
                                        <li> 不会抄袭、复制、公开、分发、出售或以直接或间接与ebixSYSTEM构成竞争的任何方式，为商业目的而利用本服务提供的服务及内容 </li>
                                        <li> 不会删除或更改任何由ebixSYSTEM透过其所提供的内容的任何版权或其他所有权告示；</li>
                                        <li> 不会发布或传输任何种类的违法、欺诈、中伤、诽谤、淫秽、色情、亵渎、恐吓、污秽、讨厌、令人反感或其他不良或过份的内容，包括但不限于传输含有或怂恿可构成刑事罪、导致民事责任，或以其他方式违反任何当地、国家、全国性或外国法律的行为的内容；
                                        </li>
                                        <li> 不会侵害任何人之任何专利、商标、营业秘密、版权或其他专属权利； </li>
                                        <li> 不会发布或者传输任何广告、游说、连锁信、层压式推销计画、投资机会或计画或其他未经要求而提供的商业通讯； </li>
                                        <li> 不会发布或传输含任何病毒、欺骗程式、蠕虫或者其他有害成分的任何内容； </li>
                                        <li> 不会未经其他人同意，利用本服务收集其他人的电邮位址及内容； </li>
                                        <li> 不会滥寄垃圾邮件； </li>
                                    </ul>
                                    <dd>ebixSYSTEM无法控制经由本服务而张贴之内容，因此不保証内容之正确性、完整性或品质。您了解使用本服务时，可能会接触到令人不快、不适当、令人厌恶、带有错误或欺诈方式之资讯，故请谨慎采用。在任何情况下，ebixSYSTEM均不为任何内容负责，包含但不限于任何内容之任何错误或遗漏，以及经由本服务张贴、发送电子邮件或传送而衍生之任何损失或损害。ebixSYSTEM为确保资料库的品质，有权在给予或不给予通知的情况下隐藏不适当或不完整的产品资料及采购资讯。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>免费增值模式</dt>
                                    <dd>ebixSYSTEM有免费及增值部份。每位注册用户均可永久免费使用免费部份，您的系统用户人数不限，ebixSYSTEM并付予每注册用户1GB储存空间。鑑于商业公平原则，每一注册用户的有效期为两年，用户如需继续使用ebixSYSTEM，您需要每两年续签ebixSYSTEM服务协议。ebixSYSTEM的增值部份为ebixSYSTEM
                                        的收费部份，如您使用有关服务，您的服务协议 (免费及增值部份)
                                        即自动延长两年。本公司保留权利可随时修改其收费及付费方式而无需得到您的意见，新收费将会在新的服务协议中生效。</dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>私隐政策</dt>
                                    <dd>您的个人资料经由我们提供该服务时而收集，这些资料均受到本公司的私隐政策的规范。有关ebixSYSTEM的私隐政策，请参阅本网站内的私隐政策声明。</dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>您授予ebixSYSTEM的许可使用权</dt>
                                    <dd>您授予ebixSYSTEM独家的、全球通用的、永久的、免费的许可使用权利，使本公司有权使用、复制、修订、改写、发布、翻译、分发、执行和展示您的资料及内容或制作其派生作品。您更授予ebixSYSTEM许可使用权利将您的名字公布于有关其运作及推广ebixSYSTEM服务之用，而无需支付或给予您任何费用。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>补偿</dt>
                                    <dd>您同意就您违反使用条款的任何一款及/或使用本网页有关或因此而产生的任何责任、损害赔偿、申诉、诉讼、费用及支出(包括但不限于法律费用)而为ebixSYSTEM提出抗辩，作出补偿并使本公司及各联合公司不受伤害。如有必要，ebixSYSTEM可能参加任何申索或者诉讼的抗辩及参与任何和解商议。若无本公司事先书面同意，不得作出任何对本公司权利或义务有不利影响的和解。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>服务之修改</dt>
                                    <dd>在通知或未通知的情形下，ebixSYSTEM有权在任何时间暂时或永久修改或终止本服务（或其任何部分）。本服务任何修改、暂停或终止，您同意ebixSYSTEM对您和任何第三人均不承担责任。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>终止</dt>
                                    <dd>您同意ebixSYSTEM可自行决定，因任何理由，包含但不限于缺乏使用，或本公司认为您已经违反本服务条款的明文规定及精神，终止您就本服务的使用权，并将本服务内任何资料及资讯(如您的网页、采购资讯等)
                                        删除。ebixSYSTEM亦得依其自行之决定，于通知或未通知之情形下，随时终止本服务或其任何部分。您同意依本服务条款任何规定提供之服务，无需进行事先通知即得终止，您承认并同意，ebixSYSTEM得立即关闭或删除您的ebixSYSTEM帐户及所有相关资料。此外，您同意若本服务之使用被终止，ebixSYSTEM对您或任何第三人均不承担责任。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>连结</dt>
                                    <dd>本服务或第三人可提供与其他全球资讯网上之网站或资源之连结。由于ebixSYSTEM无法控制前开网站及资源，您了解并同意，前开外部网站或资源是否可供利用，ebixSYSTEM不予负责，存在或源于前开网站或资源之任何资讯、广告、产品或其他资料，不代表ebixSYSTEM对其赞同亦不予负责。您进一步同意，因使用或信赖存在或经由前开任何网站或资源之任何资讯、商品或服务所生或据称所生之任何损害或损失，ebixSYSTEM不负任何直接或间接之责任。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>知识产权权利</dt>
                                    <dd>本网页的一切知识产权权利属于ebixSYSTEM。在此保留适用法律项下的一切权利。除经ebixSYSTEM许可者外，鉴于本网页按适用法律具有版权，因此您不得以任何方式上载、发帖、发布、复制、传输或派发本网页的任何成分或在其上设定衍生作品。此外，您了解并同意，本服务及本服务所使用的任何相关必要软体含有受到相关知识产权及其他法律保护之专属性及机密性资料。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>免责声明</dt>
                                    <dd>所有资讯仅供参考。ebixSYSTEM对此资讯不负任何责任。您明确了解并同意以下几点：</dd>
                                    <ul>
                                        <li>用户使用本服务之风险由用户个人承担。本服务是依据现状基础提供。ebixSYSTEM不提供任何明示或暗示的担保，包含但不限于商业销售、特定目的之适用性及未侵害他人权利；
                                        </li>
                                        <li>ebixSYSTEM不保証以下事项：i) 本服务将符合用户的要求；ii) 本服务不受干扰、及时提供安全可靠或免于出错；iii)
                                            由本服务使用而取得的结果为正确、充足或可靠；iv) 用户经由本服务购买或取得的任何产品、服务、资讯或其他资料将符合用户的期望；v)
                                            软体中任何错误将得到更正。</li>
                                        <li>是否使用本服务下载或取得任何资料应由用户自行决定且自负风险，因用户此前下载任何资料而导致用户电脑系统有任何损坏或资料丢失，用户应负完全责任。</li>
                                        <li>用户在ebixSYSTEM上或由本服务取得的建议和资讯，无论其为书面或口头，绝不构成本服务条款未明确规定的任何保証。</li>
                                    </ul>
                                </dl>

                                <dl class="dl1">
                                    <dt>责任限制</dt>
                                    <dd>在任何情况下，ebixSYSTEM或其各联号公司对您或任何其他人士因使用或不能使用此服务所发生的任何直接的、间接的、附带引起的、特别的、惩罚性的或者间接性的损失包括任何业务或盈利的损失，不承担任何责任。即使ebixSYSTEM或其联号公司已获知可能会有的损害赔偿，亦是如此。用户在使用或解释此资讯时，应运用并依赖自己的技能和判断。您有责任确保使用此资讯须遵守所有适用的法律规定。本使用条款所含的责任限制适用于适用法律所许可的最大限度。
                                    </dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>通知</dt>
                                    <dd>本服务的一般条款或其他事项有所变更时，将不会另行通知。因此，您应随时查阅网站内最新版的服务条款。</dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>规限法律及司法管辖权</dt>
                                    <dd>本服务条款应受香港特别行政区法律的规限。您同意接受香港法院的非专属司法管辖权的管辖。</dd>
                                </dl>

                                <dl class="dl1">
                                    <dt>中文版本</dt>
                                    <dd>如本服务条款的中文版本和英文版本有任何冲突或者不符，应以英文版本为准。如中文版本的任何部分有不清晰之处，应参照英文版本。</dd>
                                </dl>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div v-else class="pri-box clear-fix">
                <p>此"隐私政策声明"解释了 ebixsystem.com ("ebixSYSTEM")保护私隐的做法，请细心阅读!
                    在您同意ebixSYSTEM的"服务协议"之时，您已经同意我们按照本隐私政策来使用和披露您的个人资料。本隐私声明的全部条款属于该服务协议的一部分。 </p>

                <dl class="dl1">
                    <dt>资料收集及使用 </dt>
                    <ul>
                        <li> 当您注册ebixSYSTEM会员账户时，我们会问及您的个人资料，如公司名称、公司地址、联系人等。拒绝提供个人资料，可能导致我们不能处理有关的注册。 </li>
                        <li> 您的个人资料也可能在ebixSYSTEM提供的其他服务中收集，例如在「採购信息」发佈或查询信息。 </li>
                        <li> ebixSYSTEM会自动接收并纪录您的网络协议地址、访问过的网页、浏览器上的伺服器数值等，为本网站的使用情况备份统计资料。</li>
                        <li> 当您订购ebixSYSTEM的付费服务时，我们可能需要额外获取您的资料，例如账单资料、信用卡资料等。这些资料也可能向银行及其他金融机构提供，用作授权此付款交易。 </li>
                        <li> ebixSYSTEM会使用资料作以下用途: </li>
                        <ul>
                            <li>处理用户的注册或服务登记、订购、查询或回应；</li>
                            <li>ebixSYSTEM的内部运作；</li>
                            <li>推广服务；</li>
                            <li>用作授权付款交易；</li>
                            <li>依照香港境内外适用法律的规定作出透露；</li>
                            <li>备份一般的统计资料；</li>
                            <li>其他相关项目。 </li>
                        </ul>
                    </ul>
                </dl>

                <dl class="dl1">
                    <dt>透露资料</dt>
                    <dd>ebixSYSTEM对所持有的个人资料绝对保密，但也可能将个人资料提供给任何以下的公司或单位: </dd>
                    <ul>
                        <li>向ebixSYSTEM提供与本网站业务运作有关的服务；</li>
                        <li>向您提供您要求的产品或服务；</li>
                        <li>依照香港境内外适用的法律。 </li>
                    </ul>
                </dl>

                <dl class="dl1">
                    <dt>共用资料 </dt>
                    <dd>当您成功注册使用ebixSYSTEM的网页服务的同时，您应明白您的部分个人识别资料会自动在属于您网页的「联繫我们」页中列出来。这些资料将会被公开并提供给我们的用户浏览。</dd>
                </dl>

                <dl class="dl1">
                    <dt>Cookies </dt>
                    <dd>ebixSYSTEM会到您的电脑设定并取用Cookie。目的是省去您的时间，令您再次到访ebixSYSTEM或使用我们的服务时无须重复输入您的个人资料。我们还会利用Cookie收集本网站已浏览网页及使用模式的统计资料以便计算浏览量，判定本网站各部分的受欢迎程度，及取得使用者的一般统计资料。如果您的浏览器不接受使用Cookie，您可能无法使用或进入我们为您提供的服务或功能。
                    </dd>
                </dl>

                <dl class="dl1">
                    <dt>修改或取消账户资料 </dt>
                    <dd>您可在成功登入ebixSYSTEM的账户后，随时修改您的公司资料及密码。如需取消您在ebixSYSTEM的账户资料，请使用"联繫我们"页面电邮我们。 </dd>
                </dl>

                <dl class="dl1">
                    <dt>保安 </dt>
                    <dd>为保障您的隐私权，您的ebixSYSTEM账户资料会用密码保护。只能由ebixSYSTEM获授权的职员操作，指定处理个人资料的职员会熟悉此隐私政策声明。我们会採用相应的安全措施来确保我们掌握的资料不被错误使用或滥用。
                    </dd>
                    <dd>随着ebixSYSTEM所提供的服务范围不断扩大，本声明将会随时修改。我们欢迎您随时查阅本声明，如有任何疑问请使用"联繫我们"页面电邮我们。

                    </dd>
                </dl>



            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClause  = false" class="btn-light">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name: 'Register',
        components: {},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    if (this.registerForm.ConfirmPassword !== '') {
                        this.$refs.registerForm.validateField('ConfirmPassword');
                        callback();
                    } else {
                        callback();
                    }
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            var validatePass3 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请确认'));
                } else {
                    callback();
                }
            };

            return {
                registerForm: {
                    regType: 1,//用邮箱还是手机登录
                    phone: "",
                    email: "",
                    password: '',
                    ConfirmPassword: "",
                    check_verify_code: "",
                    flat: true,
                    accept: true,
                    area_code: "86"
                },
                registerRules: {
                    // email: [{required: true, trigger: 'blur', message:"邮箱不能为空!"}, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } ],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass
                    }],
                    ConfirmPassword: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePass2
                    }],
                    check_verify_code: [{
                        required: true,
                        trigger: 'blur',
                        message: '验证码不能为空'
                    }],
                    accept: [
                        {
                            required: true,
                            trigger: 'change',
                            validator: validatePass3
                        }
                    ]
                },

                passwordType: 'password',
                loading: false,
                time: 120,
                timeBtn: false,
                dialogModal: false,

                sendBtnLoad: false,//发送验证码后的等待按钮
                areaCodeList: [],

                dialogClause: true,//协议和私隐政策的模态框
                dialogType: "1",//1用用户协议2是隐私政策

            }
        },
        mounted() {
            this.$store.dispatch("common/getAreaCode").then(response => {
                this.areaCodeList = response.data
            })
        },
        methods: {
            submitregister(formName) {
                var obj = {
                    regType: this.registerForm.regType,
                    password: this.registerForm.password,
                    confirm_password: this.registerForm.ConfirmPassword,
                    check_verify_code: this.registerForm.check_verify_code,
                }
                if (obj.regType == 1) {
                    obj.email = this.registerForm.email
                } else {
                    obj.mobile = this.registerForm.phone
                    obj.area_code = this.registerForm.area_code
                }
                var that = this
                this.$refs[formName].validate((valid) => {
                    console.log("validate...", valid)
                    if (valid) {
                        this.dialogModal = true;
                        this.$store.dispatch('register', {
                            "data": obj
                        }).then(response => {
                            this.dialogModal = false
                            if (response.code == 0) {
                                this.success("注册成功")
                                setTimeout(() => {
                                    that.$router.push('/loginNew');
                                }, 1000);
                            } else {
                                this.error(response.msg);

                            }
                        }).catch((error) => {
                            console.log("error...", error)
                        })
                    }
                })
            },

            func(data) {
                var that = this
                console.log(data)
                var arr = Object.keys(data);
                console.log(arr)
                for (var i = 0; i < arr.length; i++) {
                    timer(data, i);
                }

                function timer(data, i) {
                    var obj = data[i]
                    setTimeout(function () {
                        that.error(obj)
                    }, i * 300);
                }
            },
            checkVerifyFunc() {
                if (this.registerForm.regType == 1) {
                    if (this.registerForm.email == "") {
                        this.error('邮箱不能为空')
                    } else {
                        if (this.check_email()) {
                            this.sendBtnLoad = true
                            this.sendSMS()
                        }

                    }
                } else if (this.registerForm.regType == 2) {
                    if (this.registerForm.phone == "") {
                        this.error('电话不能为空')
                    } else {
                        if (this.check_phone()) {
                            this.sendSMS()
                            this.sendBtnLoad = true
                        }
                    }
                }
            },
            /*验证码倒计时*/
            countdown() {
                let that = this
                this.timeBtn = true
                this.timeDown = setInterval(function () {
                    if (that.time > 0) {
                        that.time--
                    } else {
                        that.closecountdown()
                    }
                }, 1000)
            },
            closecountdown() {
                clearInterval(this.timeDown);
                this.timeBtn = false
                this.time = 120
            },
            sendSMS() {
                var obj = {}
                if (this.registerForm.regType == 1) {
                    obj.regType = this.registerForm.regType
                    obj.email = this.registerForm.email
                } else if (this.registerForm.regType == 2) {
                    obj.regType = this.registerForm.regType
                    obj.mobile = this.registerForm.phone
                }
                this.$store.dispatch('sendSMS', {
                    "data": obj
                }).then(response => {
                    console.log("sendSMS success...", response);
                    this.sendBtnLoad = false
                    this.countdown()
                    if (response.data.code == 0) {
                        this.success('验证码已经发送！')
                    }
                }).catch((error) => {
                    this.closecountdown()
                    this.error(error)
                    console.log("sendSMS error...", error)
                })
            },
            registerType(val) {
                this.registerForm.regType = val
                setTimeout(() => {
                    if (val == 1) {
                        this.$refs.registerForm.validateField('email');
                    } else {
                        this.$refs.registerForm.validateField('phone');
                    }
                }, 100)
            },
            checkPhone(rule, value, callback) {

                if (!value) {
                    return callback(new Error("电话号码不能为空"))
                }
                setTimeout(() => {
                    /*Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
                    所以我就在前面加了一个+实现隐式转换*/
                    if (!Number.isInteger(+value)) {
                        callback(new Error("请输入数字值"))
                    } else {
                        callback()
                    }
                    // else {
                    //     const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
                    //     if (phoneReg.test(value)) {
                    //         callback()
                    //     } else {
                    //         callback(new Error("电话号码格式不正确"))
                    //     }
                    // }
                }, 100)
            },
            loginPage() {
                this.$router.push('/loginNew');
            },
            check_email() {
                var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!regEmail.test(this.registerForm.email)) {
                    this.error("邮箱格式不正确")
                    return false
                } else {
                    return true
                }
            },
            check_phone() {
                var regPhone = /^1[0-9]{10}$/
                if (!regPhone.test(this.registerForm.phone)) {
                    this.error("手机号码格式不正确")
                    return false
                } else {
                    return true
                }
            },

            success(msg) {
                this.$notify({
                    title: "提示",
                    message: msg,
                    type: "success"
                });
            },
            warning() {
                this.$notify({
                    title: "提示",
                    message: "请选择要操作的行",
                    type: "warning"
                });
            },
            error(msg) {
                this.$notify({
                    title: "提示",
                    message: msg,
                    type: "error"
                });
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    body {
        margin: 0;
    }

    .menu-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
    }

    .menu-logo img {
        height: 25px;
    }

    #registerForm_sel_area .el-select .el-input {
        width: 120px;
    }

    .regist-container-new .el-form-item__label:before {
        content: '' !important
    }

    .regist-container-new .el-card__header {
        padding: 0;
    }

    .regist-container-new .el-card__header .clearfix {
        padding: 15px;
    }

    .regist-container-new .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .regist-container-new .el-form-item__error {
        right: 0;
        top: 15%;
        left: auto;
    }

    .regist-container-new {
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100% - 296px);
    }

    .theme-default .regist-container-new .el-card__body {
        padding: 20px;
    }

    .dialogClause .el-dialog__header {
        min-height: 24px;
        font-size: 1.6em;
        font-weight: bold;
    }
</style>