// ============ ロード画面
$(window).on('load',function(){
    $("#splash-logo").delay(0).fadeOut('slow');
    $("#splash").delay(0).fadeOut('slow',function(){
    $('body').addClass('appear');
    });
    // ============ 画面遷移後
    $('.splashbg').on('animationend', function() { 
        // ============ メニューボタン
        $(".header-open").click(function(){
            $(this).toggleClass('active');
            $("#header-nav").toggleClass('panelactive');
        });
        // ============ メニューボタン/ナビゲーション
        $("#header-nav a").click(function(){
            $("header-open").removeClass('active');
            $("header-nav").removeClass('panelactive');
        });

        // ============ Muuriの初期化とフィルタリング
        const grid = new Muuri('.gallery-grid', {
            items: '.muuri-item',
            showDuration: 200,
            showEasing: 'ease-out'
        });

        // 初期表示：activeクラスが付いているボタンのセレクタで最初に絞り込んでおく
        const initialFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        grid.filter(initialFilter);

        const filterButtons = document.querySelectorAll('.filter-btn');
        const gridElement = document.querySelector('.gallery-grid');

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const filterValue = this.getAttribute('data-filter');
                const colsClass = button.getAttribute('data-cols');

                // 1. 列数を変えるクラスを親要素につけ直し
                gridElement.classList.remove('col-2', 'col-3', 'col-4');
                gridElement.classList.add(colsClass);

                // アクティブ切り替え
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // 該当カテゴリーのみを表示
                grid.filter(filterValue);

                // 3. CSS適用後のアイテムサイズ更新とレイアウト再計算
                // ※ DOM要素のサイズ変更を認識させるために必要です
                grid.refreshItems();
                grid.layout();
            });
        });

        // ウィンドウサイズが変更されたときにレイアウトを再計算
        window.addEventListener('resize', () => {
            grid.refreshItems();
            grid.layout();
        });

        // ============ モーダルウィンドウの開閉
        $(function(){
            // サムネイルをクリックして開く
            $('.muuri-item-thumb').on('click', function(){
                var target = $(this).data('target');
                $('#' + target).fadeIn();
                return false;
            });

            // 閉じるボタンまたは背景をクリック
            $('.modal_bg').on('click', function(){
                $('.modal').fadeOut();
                return false;
            });

            $('.modal_close').on('click', function(){
                $('.modal').fadeOut();
                return false;
            });

        });

    });
});