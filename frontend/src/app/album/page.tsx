import React from 'react';
import {TracingBeam} from "@/components/ui/tracing-beam";
import AlbumFlowClient from "@/components/album/AlbumFlowClient";
import {fetchPhotosByPage} from "@/api/photos";
import {noto_sans_sc, noto_serif_sc_bold} from "@/app/fonts/font";
import {clsx} from "clsx";
import FloatingMenu from "@/components/menu/FloatingMenu";

const AlbumPage = async () => {
    const initialImages = await fetchPhotosByPage(1, 10);
    return (
        <TracingBeam>
            <div>
                <h1 style={{fontSize: '2em', fontWeight: 'bolder', marginTop: '1em',transform:'translateY(-0.15em)'}}
                    className={noto_sans_sc.className}>
                    相册
                </h1>
                <div
                    className={clsx(noto_serif_sc_bold.className, 'text-gray-500 text-md mb-8 mt-4')}> 每一个精彩的瞬间，都值得被记录
                </div>
                <AlbumFlowClient initialImages={initialImages}/>
                <FloatingMenu items={[]}/>
            </div>
        </TracingBeam>
    );
};

export default AlbumPage;
